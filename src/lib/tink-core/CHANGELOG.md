# Changelog Tink core

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

<!--
## [Unreleased] - [unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->



## [1.12.4] - 2016-02-23

### Fixed
- Fixed inclusion of unwanted files and folders



## [1.12.3] - 2016-02-23

### Added
- Tink can now be installed as an NPM package



## [1.12.2] - 2016-02-19

### Added
- Added logo padding variable (mostly as a helper for the Brandweer theme)

### Changed
- Upgraded to Font Awesome 4.5



## [1.12.1] - 2016-02-03

### Fixed
- Fixed broken documentation



## [1.12.0] - 2016-02-03

### Added
- Upgraded the bar component to also work with divs
- Added small margin classes

### Changed
- Updated the appearance of cards and accordions
- Updated the appearance of tabs

### Fixed
- Fixed more specificity problems with buttons
- Fixed a broken loader when Tink was minified for a second time (by external minifiers)
- Fixed inline CSS in the datepicker
- Fixed a padding hack on the select element



## [1.11.1] - 2016-01-22

### Fixed
- Fixed a display bug in the datepicker that was introduced by the specificity fix



## [1.11.0] - 2016-01-20

### Added
- Added vertical variant of button groups
- Added inverted variant of loaders

### Fixed
- Fixed a specificity problem with buttons
- Fixed small display bug in pagination



## [1.10.1] - 2015-12-18

### Added
- Added an option for a compacter timeline

### Changed
- Improved the timeline styling

### Fixed
- Fixed a bug where the timeline line would disappear in a modal dialog
- Fixed a bug where all modal content would become selected when clicked inside the modal dialog
- Fixed the pagination view on mobile



## [1.10.0] - 2015-12-17

### Added
- Added a clear button in the timepicker
- Added larger margin helper classes

### Changed
- Completely revamped the timeline
- Removed margins from callouts, cards and breadcrumbs



## [1.9.2] - 2015-11-25

### Fixed
- Fixed an issue where an unwanted scrollbar would block the table view in certain versions of IE
- Fixed a small styling issue in the column sorter of the interactive table



## [1.9.1] - 2015-11-19

### Added
- Added the possibility to hide the spin button in numeric input fields

### Fixed
- Fixed a bug that made an inline form practically unusable



## [1.9.0] - 2015-11-18

### Added
- Added horizontal form styling

### Changed
- Changed the look of tabs
- Refactored inline form styling
- Refactored pagination
- Updated the datepicker looks



## [1.8.0] - 2015-10-30

### Added
- Added button groups
- Added a filter bar component
- Added a timeline component
- Added another possibility to always leave the sidenav open

### Changed
- Changed the way z-indexes are handled

### Fixed
- Fixed an issue that broke the navbar in IE9 in some cases



## [1.7.2] - 2015-10-21

### Fixed
- Fixed the new interactive table options not being themeable



## [1.7.1] - 2015-10-21

### Changed
- Changed the zebra striping in the striped table
- Changed the table highlight color
- Added hoverable and selected states to table rows
- The loader now also works inline and will adjust its size to its parent

### Fixed
- Fixed a bug where the datepicker would collapse when its container was too small
- Fixed a panel heading background issue
- Fixed an issue where the popover animation would start too early



## [1.7.0] - 2015-10-05

### Added
- Added breakpoints that can be read from JavaScript

### Changed
- Revamped the header styling of the table and the interactive table
- Reverted course on responsive images
- Refactored callouts
- Changed the tooltip styling
- Tweaked the color palette

### Fixed
- Color classes now override any other specified color
- Switched the looks of both the transparent buttons



## [1.6.3] - 2015-09-25

### Changed
- Implemented the new loader in the interactive table

### Fixed
- Fixed an issue with the alignment of column sorting in the interactive table



## [1.6.2] - 2015-09-22

### Changed
- Refactored interactive table styling



## [1.6.1] - 2015-09-21

### Fixed
- Fixed a bug where in some case default variable values could not be overwritten



## [1.6.0] - 2015-09-21

### Added
- Added an arrow component and applied it to the popover and tooltip component
- Added a basic loader
- Added buttons with a transparent background

### Changed
- Refactored the bar component to support flex properties
- Labels are not bold by default anymore
- Tweaked the default styling of some form elements
- Added possibility to right-align the datepicker

### Deprecated
- Deprecated the panel component in favour of the card component (panel code will be dropped in the next release)

### Fixed
- Fixed a bug where in Firefox the select element had to be clicked twice before it would open
- Fixed an overflow issue in the modal dialog
- Fixed a datepicker layout issue when used inside a modal dialog



## [1.5.11] - 2015-08-12

### Changed
- Upgraded to Font Awesome 4.4

### Fixed
- Fixed miscellaneous styling issues
- Fixed hardcoded breakpoint



## [1.5.10] - 2015-07-14

### Changed
- Separated overflow styling from modal dialog



## [1.5.9] - 2015-07-09

### Fixed
- Fixed wrong use of buttons in navigation bar
- Fixed popover menu for interactive table



## [1.5.8] - 2015-07-06

### Fixed
- Fixed transition for tooltip

### Added
- Added new stylings to bar list items



## [1.5.7] - 2015-07-02

### Fixed
- Reverted to 1.5.4, but kept borked builds



## [1.5.6] - 2015-07-02

### Fixed
- Fixed faulty build



## [1.5.5] - 2015-07-02

### Fixed
- Fixed mixup in bower file

### Added
- Added extra stylings to bar list items
- Added extra breakpoint for JavaScript



## [1.5.4] - 2015-07-02

### Added
- Added different stylings to bar list items
- Added breakpoint content for JavaScript



## [1.5.3] - 2015-06-30

### Added
- Added tooltip styling



## [1.5.2] - 2015-06-26

### Changed
- Made subtle design changes to panel and accordion
- Optimized the panel title so that basic HTML can be added



## [1.5.1] - 2015-06-24

### Fixed
- Fixed the accordion toggle's position



## [1.5.0] - 2015-06-24

### Changed
- Changed the panels' look

### Fixed
- Removed an unwanted dependency in the Bower file
- Moved the panel variables to the main variables file



## [1.4.3] - 2015-06-24

### Fixed
- Fixed an issue with nested panels where all descendant toggles would get the wrong styling



## [1.4.2] - 2015-06-22

### Fixed
- Fixed an overflow issue on the body on certain viewports



## [1.4.1] - 2015-06-19

### Fixed
- Fixed missing _colors.scss file



## [1.4.0] - 2015-06-16

### Added
- Added color classes



## [1.3.1] - 2015-06-11

### Fixed
- Fixed an issue when using "max-width" in media queries



## [1.3.0] - 2015-06-10

### Added
- Added the possibility of closing the sidenavs on all media

### Changed
- Changed the behaviour of how stick-to-top elements work



## [1.2.6] - 2015-06-05

### Fixed
- Fixed the faux-input that collapsed if no data was in it



## [1.2.5] - 2015-06-05

### Added
- Added smoother page transition animations



## [1.2.4] - 2015-06-03

### Fixed
- Fixed an accordion toggle color issue



## [1.2.3] - 2015-06-01

### Fixed
- Added new sticky z-index layer



## [1.2.2] - 2015-06-01

### Fixed
- Fixed erroneous behaviour of floating elements in sticky divs



## [1.2.1] - 2015-05-29

### Fixed
- Added automatic overflow on sticky divs



## [1.2.0] - 2015-05-29

### Added
- Added option for alternate background-color
- Added inline option for input elements
- Changed the way fonts are loaded; custom themes can now load their own fonts without having to override ours

### Changed
- Tink now uses Open Sans as default font instead of Lato.
- Changed default body background color
- Tweaked the panel design
- Created a responsive table mixin in favour of duplicate code
- Added standard margin to nav elements

### Fixed
- Fixed a panel heading rendering bug
- Fixed a form input field rendering bug



## [1.1.0] - 2015-05-20

### Added
- Added tabbed navigation
- Added labels
- Added a version of the responsive table that works in any viewport

### Fixed
- Fixed a background-color issue with the responsive table



## [1.0.5] - 2015-05-20

### Added
- Added styling for stick to top directive



## [1.0.4] - 2015-05-12

### Added
- Added utility class for panel



## [1.0.3] - 2015-05-05

### Added
- Added loading state for interactive table

### Fixed
- Fixed an issue where the minified code of the select element was broken



## [1.0.2] - 2015-05-05

### Fixed
- Added forgotten badges styling from older Tink repository



## [1.0.1] - 2015-05-04

### Changed
- Changed behaviour of the interactive table, since it conflicted with the sort table



## [1.0.0] - 2015-02-12

Initial release
