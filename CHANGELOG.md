# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.8] - 2023-02-08

### Added
- Now `MapView` exposes Typescript interfaces to facilitate the integration of callbacks.
- All interfaces and callbacks have been added to the [documentation](./README.md).
- Added `minZoom` and `maxZoom` parameters to limit the WYF underlying map.

### Changed
- Updated WYF Android to version 0.24.2.
- Updated WYF iOS to version 0.18.0.
- Changed the default value of `useDashboardTheme` to `true`.
- Refactored the code that loads the WYF module.
- Refactored the object mappings.

### Fixed
- Now all the exposed callbacks are working as expected.

## [0.1.7] - 2022-12-23

### Changed
- Updated WYF iOS to version [0.17.1](https://developers.situm.com/sdk_documentation/wayfinding/appledoc/).


## [0.1.6] - 2022-12-16

### Changed
- Updated WYF Android to version [0.22.2](https://situm.com/docs/android-wyf-changelog/#0-toc-title).

## [0.1.5] - 2022-12-07

### Fixed
- Fixed issue when mounting MapView on a StackView or TabBarController.

## [0.1.2] - 2022-09-06

### Fixed
- Fixed a bug that crashes the module when the map is loaded.