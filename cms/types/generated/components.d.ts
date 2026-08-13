import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_calls_to_action';
  info: {
    description: "De blauwe contactsectie onderaan pagina's";
    displayName: 'Call-to-action';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_info';
  info: {
    description: 'Publieke contact- en profielgegevens';
    displayName: 'Contactgegevens';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    githubUrl: Schema.Attribute.String;
    linkedinUrl: Schema.Attribute.String;
    location: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    whatsappUrl: Schema.Attribute.String;
  };
}

export interface SharedHomeService extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_services';
  info: {
    description: 'Compacte dienstkaart op de homepage';
    displayName: 'Dienst op homepage';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    tags: Schema.Attribute.JSON & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetaTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_tags';
  info: {
    description: 'Veilige extra meta-tag met een name- of property-attribuut';
    displayName: 'Extra meta-tag';
  };
  attributes: {
    attribute: Schema.Attribute.Enumeration<['name', 'property']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'name'>;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    metaKey: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPageHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_heroes';
  info: {
    description: 'Introductie bovenaan een pagina';
    displayName: 'Pagina-intro';
  };
  attributes: {
    highlight: Schema.Attribute.String;
    kicker: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    description: 'Genummerde stap met resultaat';
    displayName: 'Processtap';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    result: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedService extends Struct.ComponentSchema {
  collectionName: 'components_shared_services';
  info: {
    description: 'Uitgebreide dienst op de dienstenpagina';
    displayName: 'Dienst';
  };
  attributes: {
    detail: Schema.Attribute.Text & Schema.Attribute.Required;
    isWebsiteService: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    landingIntro: Schema.Attribute.Text;
    lead: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    seoKeyword: Schema.Attribute.String;
    slug: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSummaryCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_summary_cards';
  info: {
    description: 'Een titel met een korte toelichting';
    displayName: 'Tekstkaart';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTrackingSettings extends Struct.ComponentSchema {
  collectionName: 'components_shared_tracking_settings';
  info: {
    description: 'Google- en advertentietags die alleen na toestemming worden geladen';
    displayName: 'Tracking en pixels';
  };
  attributes: {
    consentText: Schema.Attribute.Text & Schema.Attribute.Required;
    consentTitle: Schema.Attribute.String & Schema.Attribute.Required;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    googleTagId: Schema.Attribute.String;
    googleTagManagerId: Schema.Attribute.String;
    metaPixelId: Schema.Attribute.String;
    snapPixelId: Schema.Attribute.String;
    tiktokPixelId: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.call-to-action': SharedCallToAction;
      'shared.contact-info': SharedContactInfo;
      'shared.home-service': SharedHomeService;
      'shared.meta-tag': SharedMetaTag;
      'shared.page-hero': SharedPageHero;
      'shared.process-step': SharedProcessStep;
      'shared.service': SharedService;
      'shared.summary-card': SharedSummaryCard;
      'shared.tracking-settings': SharedTrackingSettings;
    }
  }
}
