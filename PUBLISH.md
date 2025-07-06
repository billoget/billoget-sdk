# Billoget SDK - Publishing Guide

## Prerequisites

1. **NPM Account**: Ensure you have access to the Billoget NPM organization
2. **Authentication**: Login to NPM with proper credentials
3. **Permissions**: Verify you have publish permissions for @billoget scope

## Pre-Publication Checklist

### ✅ Code Quality

- [x] All tests passing (`npm test`)
- [x] Build successful (`npm run build`)
- [x] TypeScript compilation without errors
- [x] ESLint checks passed (`npm run lint`)
- [x] Code formatted (`npm run format`)

### ✅ Documentation

- [x] README.md complete with examples
- [x] CHANGELOG.md updated
- [x] API documentation in billoget-developers
- [x] TypeScript types exported correctly

### ✅ Package Configuration

- [x] package.json version updated
- [x] Files array configured correctly
- [x] Main and types fields point to correct files
- [x] Dependencies are correct and minimal

### ✅ Repository

- [x] Code pushed to GitHub
- [x] Version tagged (v1.0.0)
- [x] Repository URL in package.json

## Publishing Steps

### 1. Login to NPM

```bash
npm login
# Enter credentials for billoget organization
```

### 2. Verify Package

```bash
# Check what will be published
npm pack --dry-run

# Verify package contents
npm pack
tar -tzf billoget-sdk-1.0.0.tgz
rm billoget-sdk-1.0.0.tgz
```

### 3. Test Installation

```bash
# Test in a separate directory
mkdir test-installation
cd test-installation
npm init -y
npm install ../billoget-sdk

# Test import
node -e "console.log(require('billoget-sdk'))"
cd ..
rm -rf test-installation
```

### 4. Publish to NPM

```bash
# Publish to NPM registry
npm publish

# If using scoped package (future)
# npm publish --access public
```

### 5. Verify Publication

```bash
# Check if package is available
npm view billoget-sdk

# Test installation from NPM
mkdir verify-npm
cd verify-npm
npm init -y
npm install billoget-sdk
node -e "console.log(require('billoget-sdk').BillogetSDK.getVersion())"
cd ..
rm -rf verify-npm
```

## Post-Publication Tasks

### 1. Update Documentation

- [ ] Update billoget-developers with NPM links
- [ ] Add installation badges to README
- [ ] Update API documentation with NPM examples

### 2. Announce Release

- [ ] GitHub release notes
- [ ] Update main Billoget documentation
- [ ] Notify developer community
- [ ] Update developer portal

### 3. Monitor

- [ ] Check NPM download stats
- [ ] Monitor GitHub issues
- [ ] Watch for user feedback
- [ ] Track usage metrics

## Version Management

### Semantic Versioning

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (1.x.0): New features, backward compatible
- **PATCH** (1.0.x): Bug fixes, backward compatible

### Future Releases

```bash
# For patch releases
npm version patch
git push origin main --tags
npm publish

# For minor releases
npm version minor
git push origin main --tags
npm publish

# For major releases
npm version major
git push origin main --tags
npm publish
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**

   ```bash
   npm logout
   npm login
   ```

2. **Package Already Exists**

   ```bash
   npm version patch
   npm publish
   ```

3. **Permission Denied**
   - Verify organization membership
   - Check package scope permissions

4. **Build Errors**
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

### Rollback Process

If you need to unpublish (within 24 hours):

```bash
# Unpublish specific version
npm unpublish billoget-sdk@1.0.0

# Unpublish entire package (use with caution)
npm unpublish billoget-sdk --force
```

## Security Considerations

- Never commit NPM tokens
- Use 2FA for NPM account
- Regularly audit dependencies
- Monitor for security vulnerabilities

## Support

For publishing issues:

- NPM Support: support@npmjs.com
- Billoget Team: developers@billoget.com
- GitHub Issues: https://github.com/billoget/billoget-sdk/issues

---

**Note**: This guide assumes you have the necessary permissions to publish under the Billoget organization. Contact the team lead if you need access.
