# Dependency Notes

## Known Issues

### React Scripts 5.0.1
The project uses `react-scripts` 5.0.1, which is the latest stable version of Create React App. However, it has several deprecated dependencies:

- **svgo** (1.3.2) - outdated, but required by react-scripts
- **postcss** (<8.4.31) - has a moderate severity vulnerability
- **webpack-dev-server** (<=5.2.0) - has moderate severity vulnerabilities
- Various deprecated Babel plugins (now merged into ECMAScript standard)

### Why Not Fixed?
Running `npm audit fix --force` would break the build by installing react-scripts@0.0.0.

### Recommendations
1. **For Production**: The build works fine and these are mostly dev dependencies. The vulnerabilities are low risk for a static site.
2. **Future Migration**: Consider migrating to Vite or Next.js when time permits, as Create React App is no longer actively maintained.
3. **Current Status**: The site builds successfully on Vercel despite the warnings.

## Updated Dependencies
- React: 18.2.0 → 18.3.1
- React DOM: 18.2.0 → 18.3.1  
- React Router DOM: 6.20.0 → 6.28.0

## Build Status
✅ Builds successfully on Vercel
✅ All functionality works as expected
⚠️ Deprecation warnings present but non-blocking
