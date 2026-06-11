import React from 'react'
import { Pill, Text } from '@instructure/ui'

const STATUS_CONFIG = {
  published:   { color: 'success', label: 'Published' },
  unpublished: { color: 'alert',   label: 'Unpublished' },
  concluded:   { color: 'primary', label: 'Concluded' },
}

export default function CourseCard({ course }) {
  const status = STATUS_CONFIG[course.status] ?? STATUS_CONFIG.published

  return (
    <article
      style={{
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.12)',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.14)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.12)'
      }}
    >
      {/* Card header band */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        tabIndex={0}
        aria-label={`Go to ${course.name}`}
        style={{
          display: 'block',
          height: '136px',
          backgroundColor: course.color,
          position: 'relative',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        {/* Course code overlay at bottom-left of band */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '14px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: 'Lato, sans-serif',
            letterSpacing: '0.03em',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          {course.shortName}
        </span>

        {/* Status pill top-right */}
        <span
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <Pill color={status.color}>{status.label}</Pill>
        </span>
      </a>

      {/* Card body */}
      <div
        style={{
          padding: '14px',
          borderTop: '1px solid #E8ECEE',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            color: '#0770A3',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '1.35',
            fontFamily: 'Lato, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.name}
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
          <Text size="x-small" color="secondary">
            {course.termLabel}
          </Text>
          <Text size="x-small" color="secondary">
            {course.instructorName}
          </Text>
        </div>
      </div>

      {/* Card footer — quick-access links (Canvas pattern) */}
      <div
        style={{
          borderTop: '1px solid #E8ECEE',
          padding: '8px 14px',
          display: 'flex',
          gap: '12px',
        }}
      >
        {['Dashboard', 'Grades', 'Syllabus'].map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '12px',
              color: '#0770A3',
              textDecoration: 'none',
              fontFamily: 'Lato, sans-serif',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
          >
            {link}
          </a>
        ))}
      </div>
    </article>
  )
}
