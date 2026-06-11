import React from 'react'
import {
  IconDashboardLine,
  IconCoursesLine,
  IconCalendarMonthLine,
  IconInboxLine,
  IconGroupLine,
  IconQuestionLine,
  IconUserLine,
} from '@instructure/ui'

// Canvas brand color — used as the active-item indicator bar
const BRAND = '#1770AB'

function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-current={active ? 'page' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        width: '100%',
        padding: '10px 0',
        color: active ? '#fff' : 'rgba(255,255,255,0.68)',
        textDecoration: 'none',
        fontSize: '10px',
        fontWeight: active ? '600' : '400',
        position: 'relative',
        backgroundColor: active ? 'rgba(0,0,0,0.25)' : 'transparent',
        transition: 'background-color 0.1s',
        cursor: active ? 'default' : 'pointer',
        letterSpacing: '0.01em',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {/* Active state: white left-edge bar */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '6px',
            bottom: '6px',
            width: '3px',
            backgroundColor: '#fff',
            borderRadius: '0 2px 2px 0',
          }}
        />
      )}

      {/* Icon */}
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          color: 'inherit',
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <span style={{ color: 'inherit' }}>{label}</span>
    </a>
  )
}

export default function GlobalNav() {
  return (
    <nav
      aria-label="Global navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '76px',
        height: '100vh',
        backgroundColor: '#394B58',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100,
        overflowY: 'auto',
        // Canvas nav has no scrollbar
        scrollbarWidth: 'none',
      }}
    >
      {/* Institution logo area */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        aria-label="Canvas – Home"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '76px',
          height: '56px',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textDecoration: 'none',
          marginBottom: '4px',
        }}
      >
        {/* Canvas C-mark logo */}
        <svg
          aria-hidden="true"
          width="42"
          height="42"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orange rounded-square background */}
          <rect width="100" height="100" rx="16" fill="#E66000" />
          {/* C-mark: thick arc open to the right */}
          <path
            d="M64 28C58.4 23.6 51.5 21 44 21
               C27.4 21 14 34.4 14 51
               C14 67.6 27.4 81 44 81
               C51.5 81 58.4 78.4 64 74"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </a>

      {/* Primary nav items */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
        <NavItem icon={<IconDashboardLine size="small" />} label="Dashboard" />
        <NavItem icon={<IconCoursesLine size="small" />} label="Courses" active />
        <NavItem icon={<IconCalendarMonthLine size="small" />} label="Calendar" />
        <NavItem icon={<IconInboxLine size="small" />} label="Inbox" />
        <NavItem icon={<IconGroupLine size="small" />} label="Groups" />
      </div>

      {/* Bottom items */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '4px',
          paddingBottom: '8px',
        }}
      >
        <NavItem icon={<IconQuestionLine size="small" />} label="Help" />

        {/* User avatar */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="Account – Alex Jordan"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '10px 0',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.68)',
            fontSize: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1770AB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: '700',
              fontSize: '13px',
              fontFamily: 'Lato, sans-serif',
            }}
            aria-hidden="true"
          >
            AJ
          </span>
          <span>Account</span>
        </a>
      </div>
    </nav>
  )
}
