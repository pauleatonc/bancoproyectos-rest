import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://oid.subdere.gob.cl/', // La URL del servidor de Keycloak
  realm: 'app-qa', // El nombre del realm
  clientId: 'localhost-front', // El clientId configurado en Keycloak
  scope: 'claveUnica',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;