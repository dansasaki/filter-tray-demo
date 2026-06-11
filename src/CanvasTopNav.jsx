import React from 'react'
import {
  TopNavBar,
  ScreenReaderContent,
  IconDashboardLine,
  IconCoursesLine,
  IconCalendarMonthLine,
  IconInboxLine,
  IconSearchLine,
  IconQuestionLine,
} from '@instructure/ui'

// Canvas "C" mark for the brand slot
const CanvasIcon = (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="12"
      y="18"
      textAnchor="middle"
      fontSize="20"
      fontWeight="900"
      fill="#fff"
      fontFamily="Lato, sans-serif"
    >
      C
    </text>
  </svg>
)

export default function CanvasTopNav() {
  return (
    <TopNavBar mediaQueryMatch="element" inverseColor={true}>
      {({ currentLayout }) => (
        <TopNavBar.Layout
          navLabel="Main navigation"
          themeOverride={{
            desktopBackgroundInverse: '#ffffff',
            desktopBottomBorderInverse: '1px solid #C7CDD1',
            smallViewportBackgroundInverse: '#ffffff',
          }}
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}

          renderMenuItems={
            <TopNavBar.MenuItems
              listLabel="Page navigation"
              currentPageId="courses"
              renderHiddenItemsMenuTriggerLabel={(n) => `${n} More`}
            >
              <TopNavBar.Item
                id="dashboard"
                renderIcon={<IconDashboardLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Dashboard
              </TopNavBar.Item>

              <TopNavBar.Item
                id="courses"
                renderIcon={<IconCoursesLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Courses
              </TopNavBar.Item>

              <TopNavBar.Item
                id="calendar"
                renderIcon={<IconCalendarMonthLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Calendar
              </TopNavBar.Item>

              <TopNavBar.Item
                id="inbox"
                renderIcon={<IconInboxLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Inbox
              </TopNavBar.Item>
            </TopNavBar.MenuItems>
          }

          renderActionItems={
            <TopNavBar.ActionItems
              listLabel="Actions"
              renderHiddenItemsMenuTriggerLabel={(n) => `${n} more`}
              renderHiddenItemsMenuTriggerTooltip={(n) => `${n} more actions`}
            >
              <TopNavBar.Item
                id="search"
                variant="icon"
                renderIcon={<IconSearchLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Search
              </TopNavBar.Item>

              <TopNavBar.Item
                id="help"
                variant="icon"
                renderIcon={<IconQuestionLine />}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Help
              </TopNavBar.Item>
            </TopNavBar.ActionItems>
          }

          renderUser={
            <TopNavBar.User>
              <TopNavBar.Item
                id="user-menu"
                variant="avatar"
                renderAvatar={{
                  avatarName: 'Alex Jordan',
                  avatarSrc: undefined,
                }}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Alex Jordan
              </TopNavBar.Item>
            </TopNavBar.User>
          }
        />
      )}
    </TopNavBar>
  )
}
