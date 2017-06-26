// Identifiant dans Azure AD de l'application
export const applicationId = 'c149779c-ac42-4ff4-946c-2d64cb2fa77f';

// Url de redirection en retour de l'authentification
export const redirectUri = 'https://h06506555.groupe.ad.macif.fr:3000/';

// Autorisation nécessaires pour les appels d'API Office Graph
// export const scope = 'user.read+user.readbasic.all+mail.send+files.read+contacts.Read+calendars.Read+Mail.Read+Directory.Read.All+Tasks.Read+Group.Read.All';
export const scope = 'user.read+user.readbasic.all+mail.read';