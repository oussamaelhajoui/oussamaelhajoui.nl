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
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    lead: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
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

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.call-to-action': SharedCallToAction;
      'shared.home-service': SharedHomeService;
      'shared.page-hero': SharedPageHero;
      'shared.process-step': SharedProcessStep;
      'shared.service': SharedService;
      'shared.summary-card': SharedSummaryCard;
    }
  }
}
