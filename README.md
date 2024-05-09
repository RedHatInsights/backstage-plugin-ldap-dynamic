# Dynamic LDAP Entity Provider

This repo is for wrapping the Backstage LDAP Entity Provider plugin as a dynamic plugin for Janus IDP / RHDH.

### Build:
```sh
./build.sh
```

The build script will show the integrity sha. The plugin tarball will be under `plugins/catalog-backend-module-ldap/dist-dynamic` 

### Config:
In your dynamic plugins config:
```yaml
  - package: "https://github.com/RedHatInsights/backstage-plugin-ldap-dynamic/releases/download/0.5.34-dynamic.DEV/backstage-plugin-catalog-backend-module-ldap-dynamic-0.5.34-dynamic.XXX.tgz"
    integrity: "sha256-bqQ04rkA62X+SfDAZ22EJcqBzGaz+nTSK4FaZQQ/0KY=" 
    disabled: false
    pluginConfig:
      ldap:
        providers:
        - target: ldaps://ds.example.net
          bind:
            dn: uid=ldap-reader-user,ou=people,ou=example,dc=example,dc=net
            secret: ${BIND-SECRET}
          users:
            dn: ou=people,ou=example,dc=example,dc=net
            options:
              filter: (uid=*)
            map:
              description: l
            set:
              metadata.customField: 'hello'
          groups:
            dn: ou=access,ou=groups,ou=example,dc=example,dc=net
            options:
              filter: (&(objectClass=some-group-class)(!(groupType=email)))
            map:
              description: l
            set:
              metadata.customField: 'hello'
```
