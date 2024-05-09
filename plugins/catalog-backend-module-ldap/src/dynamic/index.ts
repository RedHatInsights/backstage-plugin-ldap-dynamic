import { BackendDynamicPluginInstaller } from '@backstage/backend-dynamic-feature-service';

import { LdapOrgEntityProvider } from '../processors';

export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: 'legacy',
  async catalog(builder, env) {
    env.logger.info('Installing LDAP org entity provider');
    builder.addEntityProvider(
        LdapOrgEntityProvider.fromConfig(env.config, {
        id: 'ldap-entity-provider',
        logger: env.logger,
        schedule: env.scheduler.createScheduledTaskRunner({
          frequency: { hours: 1 },
          timeout: { minutes: 50 },
          initialDelay: { seconds: 15 },
        })
      }),
    );
  },
};