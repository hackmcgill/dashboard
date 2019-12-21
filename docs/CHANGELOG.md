# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add `declined` hacker status

### Changed

- Change `cancelled` hacker status to `withdrawn`

### Fixed

- Button spacing on application page

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
