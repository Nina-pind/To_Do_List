# Petit Pas

Une liste de tâches réalisée avec React et Vite.

## Lancer le projet en local

```bash
npm install
npm run dev
```

## Déploiement sur GitHub Pages

Le dépôt est configuré pour être publié sur
[https://nina-pind.github.io/To_Do_List/](https://nina-pind.github.io/To_Do_List/).

À chaque `push` sur la branche `main`, GitHub Actions construit l'application et la
publie sur GitHub Pages et tente d'activer la fonctionnalité pour le dépôt. Si
GitHub refuse cette activation, ouvrir **Settings > Pages**, choisir
**GitHub Actions** comme source, puis relancer le workflow.

Pour lancer localement les vérifications et le build :

```bash
npm run lint
npm run build
```
