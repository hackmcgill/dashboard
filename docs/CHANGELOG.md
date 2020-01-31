# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0](https://github.com/hackmcgill/dashboard/tree/2.4.0) - 2020-01-26

### Added

- Redesign hackpass page and pdf printed pass
- Resume by tier access for search
- Remove scrollbars on loggin button
- Add decision close time
- Changed the tab name for sponsor search from tier name | search to Sponsors | search

### Changed

- Sponsor dashboard layout

### Fixed

- Hacker export returns field values properly

### Removed

- Remove scrollbars on login button

## [2.3.2](https://github.com/hackmcgill/dashboard/tree/2.3.0) - 2020-01-19

### Changed

- Display travel page on navbar for hackers even if they didn't request money
- Display message on travel page if hacker requested no money

## [2.3.1](https://github.com/hackmcgill/dashboard/tree/2.3.0) - 2020-01-18

### Changed

- Update text for travel status: bus

## [2.3.0](https://github.com/hackmcgill/dashboard/tree/2.3.0) - 2020-01-15

### Added

- Status page displays appropriate message based on hacker status
- Job interest column for sponsors to see more info on hacker
- Added buttons for status page based on status
- Added travel page that displays hacker's travel status and reimbursement amount

### Changed

- Update application confirm deadline
- Update travel page text
- Update global styles for `a` tag

### Fixed

- Fixed search page not loading properly
- Fixed search queries not working
- Update saved hackers for sponsors to view without refreshing page
- Fixed search page not loading properly
- Fix withdrawn button on status page

## [2.2.2](https://github.com/hackmcgill/dashboard/tree/2.2.2) - 2020-01-05

### Changed

- Extend application close time

## [2.2.1](https://github.com/hackmcgill/dashboard/tree/2.2.1) - 2020-01-03

### Fixed

- Fixed where background image renders on status page
- Fixed close date to be midnight instead of noon

## [2.2.0](https://github.com/hackmcgill/dashboard/tree/2.2.0) - 2020-01-01

### Added

- Add application creation prevention past the deadline

### Changed

- Updated layout for confirm email page

## [2.1.0](https://github.com/hackmcgill/dashboard/tree/2.1.0) - 2019-12-31

### Added

- Add status page text constants
- Add highlight to active page on navbar

### Changed

- Switch status page text to use constants
- Update layout for confirmed account page

### Fixed

- Login button flashing when navigating to new tab
- Confirm email component flashing when navigating to home page
- Fix missing space in Create/Edit Account site title

## [2.0.3](https://github.com/hackmcgill/dashboard/tree/2.0.3) - 2019-12-28

### Fixed

- URL validation for github

## [2.0.2](https://github.com/hackmcgill/dashboard/tree/2.0.2) - 2019-12-26

### Fixed

- Job interest placeholder greyed out now
- URL validation allows empty strings
- School dropdown list uses Hind font now

## [2.0.1](https://github.com/hackmcgill/dashboard/tree/2.0.1) - 2019-12-24

### Added

- Add `declined` hacker status
- Add integer validation for travel application question
- Add URL-specific validation for Github, Dribbble, and LinkedIn

### Changed

- Change `cancelled` hacker status to `withdrawn`
- Changed `submit` to `update` based on whether hacker is creating or editing their application
- Update PR template

### Fixed

- Button spacing on application page
- Label spacing between view resume and upload resume while editing application
- Checkmark not aligning with checkbox on smaller screens
- Checkmark appearing on dropdown lists due to z-index
- Job interest dropdown colours
- Loading page will no longer flash on team page
- Dropdown list being behind other elements
- Job interest place holder greyed out now
- School dropdown list uses Hind font now
- Privacy policy error message displayed properly now
- URL validation allows empty strings

### Removed

- Remove `needsBus` value in ManageApplicationContainer
- Remove "Loading..." string

## [2.0.0](https://github.com/hackmcgill/dashboard/tree/2.0.0) - 2019-12-17

### Added

- Create changelog with previous releases
- Add sidebar styling
- Add button variant prop
- Add travel application field validation
- Add burger menu for mobile
- Add constants: SEO, Hackathon information
- Add illustrations to account creation

### Changed

- Switch from card view to sidebar view on hacker dashboard
- Modify colour variables in theme
- Update UI elements to McHacks 7 design system
- Update react-scripts to v3.3.0
- Update qrcode to v1.4.4
- Update axios to 0.18.1
- Added `windows.` prefix to all `location.` calls
- New profile page styling
- New application page styling and format
- Update fields: degrees, dietary restrictions, genders, grad years, job interests, majors, pronouns, skills
- Update graduation year field validation
- Modified password reset screens
- Refactor navbar as main dashboard navigation
- Refactor SEO to Helmet in `App.tsx`
- Update application questions
- Update status page copy for none and applied

### Fixed

- Asterisks for required fields are working now
- Use Brown for form labels
- Match job interest enum to backend
- Fix resume bug so resume is required for application submission

### Removed

- Remove `needsBus` application field

## [1.5.1](https://github.com/hackmcgill/dashboard/tree/1.5.0) - 2019-08-14

### Changed

- Refactor file names for consistency

## [1.5.0](https://github.com/hackmcgill/dashboard/tree/1.5.0) - 2019-04-19

### Added

- Allow sponsors to save hackers
- Add ability to save hacker in single hacker page
- Add screenshots to README

### Changed

- Refactor features folder

### Fixed

- Fix single hacker view bugs

### Removed

- Remove react-cosmos library

## [1.4.0](https://github.com/hackmcgill/dashboard/tree/1.4.0) - 2019-01-30

### Added

- HackPass on hacker dashboard
- Sponsor account creation
- Sponsor search
- Sponsor viewing of hackers and accounts
- Netlify status

### Changed

- Added administrative info to single-hacker view

## [1.3.0](https://github.com/hackmcgill/dashboard/tree/1.3.0) - 2019-01-18

### Added

- Add redirect after login state for multiple routes
- Add search bar to filter down table
- Add bus page and dashboard card
- Clear cache when user joins team

### Changed

- Refactor team pages
- Cleanup buttons

### Fixed

- Fix bus permissions
- Fix app access logic

## [1.2.1](https://github.com/hackmcgill/dashboard/tree/1.2.1) - 2019-01-21

### Added

- Dynamic head management
- Single hacker page
- Single hacker modal
- Refine search bar
- Need bus link
- Resume not found message

### Changed

- Cleanup of team page

## [1.2.0](https://github.com/hackmcgill/dashboard/tree/1.2.0) - 2019-01-09

### Added

- Team viewing
- Admin dashboard with search feature
- Linting with Prettier

### Changed

- Refactor account creation to Formik

### Removed

- Close submissions for applications

## [1.1.0](https://github.com/hackmcgill/dashboard/tree/1.1.0) - 2018-12-12

### Added

- Reroute to production or local API.

### Fixed

- Fix bug where creating an account wouldn't redirect you to the correct page

## [1.0.1](https://github.com/hackmcgill/dashboard/tree/1.0.1) - 2018-12-12

### Changed

- Update colours

## [1.0.0](https://github.com/hackmcgill/dashboard/tree/1.0.0) - 2018-12-11

### Added

- First release
