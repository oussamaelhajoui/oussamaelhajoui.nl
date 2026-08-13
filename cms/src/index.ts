import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const uid = 'api::site-setting.site-setting' as const;
    const existing = await strapi.documents(uid).findFirst();

    if (!existing) {
      await strapi.documents(uid).create({
        status: 'published',
        data: {
          heroTitle: 'Websites en web apps',
          heroText:
            'Ik ben Oussama El Hajoui, software engineer. Ik ontwerp en bouw snelle digitale ervaringen met React, Angular, Java en C# — van eerste idee tot solide eindproduct.',
          availability: 'Beschikbaar voor nieuwe projecten',
          quoteEmail: 'oussamaelhajoui@gmail.com',
          stack: ['React', 'Angular', 'Java', 'C#'],
        },
      });
    }

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const action = 'api::site-setting.site-setting.find';
      const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action, role: publicRole.id },
      });

      if (!permission) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
      }
    }
  },
};
