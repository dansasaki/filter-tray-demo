/**
 * Canvas LMS–themed Filter Tray Demo
 *
 * Looks and feels like Canvas's "All Courses" page.
 * Contains FIVE deliberate keyboard-accessibility bugs for training purposes.
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  BUG 1  Bad focus management – focus never enters the tray       │
 * │  BUG 2  No focus indication – outline stripped on two filters    │
 * │  BUG 3  Bad field validation – error not associated with input   │
 * │  BUG 4  Bad focus order – visual order ≠ DOM / tab order         │
 * │  BUG 5  Primary action button at the top of the tray             │
 * └──────────────────────────────────────────────────────────────────┘
 */

import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Tray,
  Heading,
  View,
  CloseButton,
  Checkbox,
  CheckboxGroup,
  SimpleSelect,
  TextInput,
  RadioInputGroup,
  RadioInput,
  Flex,
  Text,
  Pill,
  Breadcrumb,
  BreadcrumbLink,
  ScreenReaderContent,
  IconFilterLine,
} from '@instructure/ui'

import GlobalNav from './GlobalNav.jsx'
import CanvasTopNav from './CanvasTopNav.jsx'
import CourseCard from './CourseCard.jsx'
import { COURSES } from './courseData.js'

// ─────────────────────────────────────────────────────────────────────────────
// Filter predicate — applied live as users interact with the tray
// ─────────────────────────────────────────────────────────────────────────────
function applyFilters(courses, { statusFilters, category, searchTerm, priority, term, instructor }) {
  return courses.filter((c) => {
    if (statusFilters.length && !statusFilters.includes(c.status)) return false
    if (category && c.category !== category) return false
    if (searchTerm.length >= 3 && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (priority && c.priority !== priority) return false
    if (term && c.term !== term) return false
    if (instructor.length && !instructor.includes(c.instructor)) return false
    return true
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Small "active filters" badge shown on the Filters button
// ─────────────────────────────────────────────────────────────────────────────
function countActiveFilters({ statusFilters, category, searchTerm, priority, term, instructor }) {
  let n = 0
  if (statusFilters.length) n++
  if (category) n++
  if (searchTerm.length >= 3) n++
  if (priority) n++
  if (term) n++
  if (instructor.length) n++
  return n
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [trayOpen, setTrayOpen]       = useState(false)
  const [statusFilters, setStatus]    = useState([])
  const [category, setCategory]       = useState('')
  const [searchTerm, setSearch]       = useState('')
  const [searchInvalid, setInvalid]   = useState(false)
  const [priority, setPriority]       = useState('')
  const [term, setTerm]               = useState('')
  const [instructor, setInstructor]   = useState([])

  const triggerRef = useRef(null)

  const filterState = { statusFilters, category, searchTerm, priority, term, instructor }
  const visibleCourses = applyFilters(COURSES, filterState)
  const activeCount = countActiveFilters(filterState)

  // ── BUG 1 ──────────────────────────────────────────────────────────────────
  // When the tray opens focus is immediately driven back to the trigger.
  // Keyboard users cannot reach any tray content — Tab loops the page behind
  // the open tray. shouldContainFocus={false} removes the safety net.
  //
  // Fix: delete this effect; let the Tray move focus naturally (or supply
  // a defaultFocusElement pointing at the first tray control).
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (trayOpen && triggerRef.current) {
      const id = setTimeout(() => triggerRef.current?.focus(), 80)
      return () => clearTimeout(id)
    }
  }, [trayOpen])

  // ── BUG 3 (logic) ──────────────────────────────────────────────────────────
  // Only a boolean flag is set — no aria-invalid, no messages prop.
  // See the TextInput and the detached error <div> below.
  // ──────────────────────────────────────────────────────────────────────────
  const handleSearchChange = (_e, value) => {
    setSearch(value)
    setInvalid(value.length > 0 && value.length < 3)
  }

  const handleClearAll = () => {
    setStatus([]); setCategory(''); setSearch(''); setInvalid(false)
    setPriority(''); setTerm(''); setInstructor([])
  }

  return (
    <>
      {/*
        ── BUG 2 (CSS) ─────────────────────────────────────────────────────────
        .no-focus-ring removes every visible focus indicator from the two filter
        groups it wraps (Status checkboxes and Instructor checkboxes).
        Keyboard users cannot see where focus is when tabbing through them.

        Fix: delete this <style> block. Never suppress :focus-visible styles.
        ────────────────────────────────────────────────────────────────────────
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body { font-family: 'Lato', sans-serif; background: #f5f5f5; }

        .no-focus-ring *:focus,
        .no-focus-ring *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }

        @media (max-width: 600px) {
          .course-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Canvas Global Navigation ──────────────────────────────────────── */}
      <GlobalNav />

      {/* ── Page content (offset by nav width) ───────────────────────────── */}
      <div style={{ marginLeft: '76px', minHeight: '100vh' }}>

        {/* ── InstUI TopNavBar — fixed at top of the content area ─────────── */}
        <div style={{ position: 'sticky', top: 0, zIndex: 99 }}>
          <CanvasTopNav />
        </div>

        {/* ── Breadcrumb / page header bar ────────────────────────────────── */}
        <div
          style={{
            background: '#fff',
            borderBottom: '1px solid #C7CDD1',
            padding: '12px 32px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Breadcrumb label="You are here" size="large">
              <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                Canvas
              </BreadcrumbLink>
              <BreadcrumbLink>Courses</BreadcrumbLink>
            </Breadcrumb>
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main id="main-content" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 32px 64px' }}>

          {/* Page title row */}
          <Flex justifyItems="space-between" alignItems="center" margin="0 0 x-large 0">
            <Flex.Item>
              <Heading level="h1" margin="0">All Courses</Heading>
              <Text size="small" color="secondary">
                {visibleCourses.length === COURSES.length
                  ? `${COURSES.length} courses`
                  : `${visibleCourses.length} of ${COURSES.length} courses`}
              </Text>
            </Flex.Item>

            <Flex.Item>
              <Button
                elementRef={(el) => { triggerRef.current = el }}
                onClick={() => setTrayOpen(true)}
                renderIcon={IconFilterLine}
                aria-expanded={trayOpen}
              >
                Filters
                {activeCount > 0 && (
                  <>
                    {' '}
                    <Pill color="info" margin="0 0 0 x-small">
                      {activeCount}
                    </Pill>
                  </>
                )}
              </Button>
            </Flex.Item>
          </Flex>

          {/* Course grid */}
          {visibleCourses.length > 0 ? (
            <div className="course-grid">
              {visibleCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <View as="div" textAlign="center" padding="xx-large">
              <Text size="large" color="secondary">No courses match your filters.</Text>
              <View as="div" margin="small 0 0">
                <Button onClick={handleClearAll}>Clear all filters</Button>
              </View>
            </View>
          )}
        </main>
      </div>

      {/* ── Filter Tray ───────────────────────────────────────────────────── */}
      <Tray
        label="Filter Courses"
        open={trayOpen}
        onDismiss={() => setTrayOpen(false)}
        placement="end"
        size="regular"
        // BUG 1 support: no focus containment, so the useEffect's setTimeout
        // redirect to the trigger button is uncontested.
        shouldContainFocus={false}
        shouldReturnFocus={false}
      >
        <View as="div" padding="medium" style={{ width: '340px' }}>

          {/* Tray header */}
          <Flex justifyItems="space-between" alignItems="center" margin="0 0 medium 0">
            <Heading level="h2">Filter Courses</Heading>
            <CloseButton
              placement="end"
              offset="small"
              screenReaderLabel="Close filter panel"
              onClick={() => setTrayOpen(false)}
            />
          </Flex>

          {/*
            ── BUG 5 ───────────────────────────────────────────────────────────
            "Apply Filters" is the FIRST focusable element after the close
            button — placed above all six filter controls.  Keyboard users
            must tab past the primary action to reach the filters, and can
            fire it before any selection is made.

            Fix: move this Flex block to the bottom of the tray, after all
            filter inputs, so users fill in filters then hit Apply.
            ────────────────────────────────────────────────────────────────────
          */}
          <Flex gap="small" margin="0 0 medium 0">
            <Button color="primary" onClick={() => setTrayOpen(false)}>
              Apply Filters
            </Button>
            <Button onClick={handleClearAll}>Clear All</Button>
          </Flex>

          <View as="hr" margin="0 0 medium 0" borderColor="primary" />

          {/* ── Filter 1: Search (BUG 3) ────────────────────────────────── */}
          {/*
            BUG 3: TextInput deliberately omits the `messages` prop.
            There is no aria-invalid and no aria-describedby.  The error
            below is rendered in a plain <div role="none"> 18px below the
            field with no ARIA link — screen readers never announce it,
            and keyboard users must hunt for it visually.

            Fix: pass messages={[{ type: 'error', text: '…' }]} to the
            TextInput — InstUI automatically sets aria-invalid, adds
            aria-describedby, and positions the message beneath the field.
          */}
          <View as="div" margin="0 0 medium 0">
            <TextInput
              renderLabel="Search by course name"
              placeholder="e.g. Intro to Biology"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* BUG 3: disconnected error — no id, no ARIA link to the input */}
            {searchInvalid && (
              <div
                role="none"
                style={{
                  marginTop: '6px',
                  padding: '6px 10px',
                  backgroundColor: '#fef6f6',
                  border: '1px solid #f5aaaa',
                  borderRadius: '4px',
                  color: '#d9534f',
                  fontSize: '13px',
                }}
              >
                Enter at least 3 characters
              </div>
            )}
          </View>

          {/* ── Filter 2: Status (BUG 2 — no focus ring) ────────────────── */}
          <View as="div" margin="0 0 medium 0" className="no-focus-ring">
            <CheckboxGroup
              name="status"
              onChange={setStatus}
              value={statusFilters}
              description="Status"
            >
              <Checkbox label="Published"   value="published"   />
              <Checkbox label="Unpublished" value="unpublished" />
              <Checkbox label="Concluded"   value="concluded"   />
            </CheckboxGroup>
          </View>

          {/* ── Filter 3: Category ──────────────────────────────────────── */}
          <View as="div" margin="0 0 medium 0">
            <SimpleSelect
              renderLabel="Category"
              value={category}
              onChange={(_e, { value }) => setCategory(value)}
            >
              <SimpleSelect.Option id="cat-all"        value="">All Categories</SimpleSelect.Option>
              <SimpleSelect.Option id="cat-stem"       value="stem">STEM</SimpleSelect.Option>
              <SimpleSelect.Option id="cat-humanities" value="humanities">Humanities</SimpleSelect.Option>
              <SimpleSelect.Option id="cat-arts"       value="arts">Arts</SimpleSelect.Option>
              <SimpleSelect.Option id="cat-business"   value="business">Business</SimpleSelect.Option>
            </SimpleSelect>
          </View>

          {/*
            ── Filters 4 & 5: Priority + Term (BUG 4) ────────────────────────
            A CSS flex column with swapped `order` values creates a mismatch
            between visual order and DOM/tab order:

              Visual:    Term (shown 1st)  →  Priority (shown 2nd)
              Tab order: Priority (DOM 1st) →  Term (DOM 2nd)

            Pressing Tab while inside this section moves focus to Priority
            Level even though Term appears above it on screen.  This violates
            WCAG 1.3.2 (Meaningful Sequence) and 2.4.3 (Focus Order).

            Fix: remove the `order` inline styles and reorder the JSX so
            Term precedes Priority in the DOM, matching the visual layout.
            ─────────────────────────────────────────────────────────────────
          */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>

            {/* DOM position 0 — visually rendered SECOND via order:2 */}
            <div style={{ order: 2, marginBottom: '16px' }}>
              <RadioInputGroup
                name="priority"
                description="Priority Level"
                value={priority}
                onChange={(_e, value) => setPriority(value)}
              >
                <RadioInput label="High"   value="high"   />
                <RadioInput label="Medium" value="medium" />
                <RadioInput label="Low"    value="low"    />
              </RadioInputGroup>
            </div>

            {/* DOM position 1 — visually rendered FIRST via order:1 */}
            <div style={{ order: 1, marginBottom: '16px' }}>
              <SimpleSelect
                renderLabel="Term"
                value={term}
                onChange={(_e, { value }) => setTerm(value)}
              >
                <SimpleSelect.Option id="term-all"    value="">All Terms</SimpleSelect.Option>
                <SimpleSelect.Option id="term-sp26"   value="spring2026">Spring 2026</SimpleSelect.Option>
                <SimpleSelect.Option id="term-fa25"   value="fall2025">Fall 2025</SimpleSelect.Option>
                <SimpleSelect.Option id="term-su25"   value="summer2025">Summer 2025</SimpleSelect.Option>
              </SimpleSelect>
            </div>
          </div>

          {/* ── Filter 6: Instructor (BUG 2 — no focus ring) ─────────────── */}
          <View as="div" margin="0 0 medium 0" className="no-focus-ring">
            <CheckboxGroup
              name="instructor"
              onChange={setInstructor}
              value={instructor}
              description="Instructor"
            >
              <Checkbox label="Alice Johnson" value="alice" />
              <Checkbox label="Bob Smith"     value="bob"   />
              <Checkbox label="Carol White"   value="carol" />
              <Checkbox label="David Lee"     value="david" />
            </CheckboxGroup>
          </View>

        </View>
      </Tray>
    </>
  )
}
