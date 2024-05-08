# Dynamic LDAP Entity Provider

This repo is for wrapping the Backstage LDAP Entity Provider plugin as a dynamic plugin for Janus IDP / RHDH.

### Build:
```sh
yarn workspace @backstage/plugin-catalog-backend-module-ldap export-dynamic --embed-package ldapjs
```

### Package:
```sh
cd plugins/catalog-backend-module-ldap
npm pack
shasum -a 256 *.tgz | awk '{print $1}' | xxd -r -p | base64
```

### Publish:
Upload the tarball to a release with the integrity SHA above prefixed with `sha256-`

### Config:
```yaml
- package: "https://github.com/RedHatInsights/backstage-plugin-ldap-dynamic/releases/download/sometag/backstage-plugin-catalog-backend-module-ldap-someversion.tgz"
integrity: "sha256-uAmfB+SValdXElpVBPrbk9KzsAPEdNEiAod1H3CEFxI=" 
disabled: false
pluginConfig:
    dynamicPlugins:
    catalog:
        providers:
        catalog-backend-module-ldap:
            id: production
            target: "127.0.0.1"
            schedule:
            frequency:
                minutes: 60
            initialDelay:
                seconds: 15
            timeout:
                minutes: 15
```
