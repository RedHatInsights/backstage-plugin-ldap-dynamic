# Dynamic LDAP Entity Provider

This repo is for wrapping the [Backstage LDAP Entity Provider plugin](https://backstage.io/docs/integrations/ldap/org/ ) as a dynamic plugin for Janus IDP / RHDH.

### Build:
```sh
./build.sh
```

The build script will show the integrity sha. The plugin tarball will be under `plugins/catalog-backend-module-ldap/dist-dynamic` 

### Config:
To add the plugin and provide the config you'd add something like the following in your dynamic plugins YAML:
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
The dynamic LDAP plugin is the same code and follows the same config options as outlined in the [Backstage LDAP Docs.](https://backstage.io/docs/integrations/ldap/org/)

### Caveats

#### No Multiple Providers
The upstream plugin supports multiple providers, this dynamic version only supports one. This is because the provider logic was tied to the way the plugin was meant to be added to Backstage whereby the provider would be specified in the code added to the Backstage backend application:

```javascript
// The target parameter below needs to match the ldap.providers.target
  // value specified in your app-config.
  builder.addEntityProvider(
    LdapOrgEntityProvider.fromConfig(env.config, {
      id: 'our-ldap-master',
      target: 'ldaps://ds.example.net',
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 60 },
        timeout: { minutes: 15 },
      }),
    }),
  );
```

Note how they specify `target` - the code would then roll through the providers and find one that matches. Because we don't edit code with dynamic plugins I removed this feature and intead we'll just use the first provider. 

#### Totally Unsupported
This fork of the LDAP plugin isn't supported for production use by Red Hat or anyone else. If you are reading this, and you are not the author of this README, I recomend not using this until/unless a supported version is made available later.
