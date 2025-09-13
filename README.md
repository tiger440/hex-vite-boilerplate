# Architecture Hexagonale Boilerplate avec Vite

Un template de projet utilisant l'architecture hexagonale (Ports and Adapters) avec Vite et TypeScript.

## Structure du projet

```
src/
├── domain/              # Couche métier (Domain Layer)
│   ├── entities/       # Entités métier
│   ├── repositories/   # Interfaces des repositories
│   └── services/       # Services métier
├── application/         # Couche application (Application Layer)
│   ├── use-cases/      # Cas d'usage
│   └── dto/           # Data Transfer Objects
├── infrastructure/     # Couche infrastructure (Infrastructure Layer)
│   ├── repositories/  # Implémentations des repositories
│   ├── database/      # Accès aux données
│   └── http/          # Clients HTTP
├── presentation/       # Couche présentation (Presentation Layer)
│   ├── components/    # Composants UI
│   ├── pages/         # Pages
│   └── controllers/   # Contrôleurs
└── container/          # Injection de dépendances
```

## Concepts de l'Architecture Hexagonale

- **Domain Layer**: Contient la logique métier pure, indépendante de toute technologie
- **Application Layer**: Orchestre les cas d'usage et coordonne les interactions
- **Infrastructure Layer**: Implémente les détails techniques (base de données, API, etc.)
- **Presentation Layer**: Interface utilisateur et points d'entrée

## Installation et utilisation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer les tests
npm run test

# Vérifier le type checking
npm run typecheck

# Linter le code
npm run lint
```

## 🗄️ Configuration Supabase

Cette boilerplate inclut une intégration Supabase prête à l'emploi !

### Configuration rapide

1. **Copiez le fichier d'environnement :**
```bash
cp .env.example .env
```

2. **Suivez le guide complet :** 📖 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

3. **Modes disponibles :**
   - **Mode mémoire** (par défaut) : `VITE_DATABASE_MODE=memory`
   - **Mode Supabase** : `VITE_DATABASE_MODE=supabase`

### Fonctionnalités Supabase

- ✅ **Client typé** avec TypeScript
- ✅ **Repository pattern** respectant l'architecture hexagonale
- ✅ **Fallback automatique** vers la mémoire si Supabase n'est pas configuré
- ✅ **Script SQL** pour setup automatique de la base
- ✅ **Politiques RLS** configurées
- ✅ **Interface de statut** dans l'application

Le passage de la mémoire à Supabase se fait **sans modification de code** grâce à l'architecture hexagonale !

## Exemple d'utilisation

Le projet inclut un exemple complet de gestion d'utilisateurs qui démontre :

1. **Entité** (`UserEntity`): Logique métier des utilisateurs
2. **Repository Interface** (`UserRepository`): Contrat pour l'accès aux données
3. **Use Cases** (`CreateUserUseCase`, `GetUserUseCase`): Cas d'usage applicatifs
4. **Repository Implementation** (`InMemoryUserRepository`): Implémentation en mémoire
5. **Controller** (`UserController`): Point d'entrée de l'API
6. **Components** (`UserForm`, `UserList`): Interface utilisateur
7. **Dependency Injection** (`DIContainer`): Gestion des dépendances

## Avantages de cette architecture

- **Testabilité**: Logique métier isolée et facilement testable
- **Maintenabilité**: Séparation claire des responsabilités
- **Flexibilité**: Changement facile des technologies externes
- **Indépendance**: La logique métier ne dépend d'aucun framework
- **Évolutivité**: Facilite l'ajout de nouvelles fonctionnalités

## 🐳 Déploiement avec Docker

Cette boilerplate est entièrement dockerisée pour un déploiement facile en développement et en production.

### 🚀 Démarrage rapide avec Docker

```bash
# Développement avec hot-reload
npm run docker:dev

# Production
npm run docker:prod

# Développement avec base de données Supabase locale
npm run docker:dev:db
```

### 📦 Options de déploiement

#### Développement
```bash
# Démarrer l'environnement de développement
docker-compose -f docker-compose.dev.yml up --build

# Avec Supabase local (optionnel)
docker-compose -f docker-compose.dev.yml --profile with-db up --build

# Arrêter
docker-compose -f docker-compose.dev.yml down
```

#### Production
```bash
# Déploiement production simple
docker-compose up --build

# Avec proxy SSL (HTTPS)
docker-compose --profile with-ssl up --build

# Variables d'environnement pour production
VITE_DATABASE_MODE=supabase \
VITE_SUPABASE_URL=your_url \
VITE_SUPABASE_ANON_KEY=your_key \
docker-compose up --build
```

### 🏗️ Architecture Docker

- **Multi-stage build**: Optimise la taille des images
- **Nginx**: Serveur web de production avec cache et sécurité
- **Health checks**: Surveillance de la santé des conteneurs
- **SSL ready**: Support HTTPS avec nginx-proxy
- **Hot-reload**: Développement avec rechargement automatique

### 📋 Prérequis Docker

- Docker Engine 20.10+
- Docker Compose 2.0+

### 🔧 Configuration avancée

#### Variables d'environnement
Créez un fichier `.env` pour la production :
```env
VITE_DATABASE_MODE=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### SSL/HTTPS
Pour activer HTTPS en production :
1. Placez vos certificats dans `docker/ssl/`
2. Utilisez le profil SSL : `npm run docker:prod:ssl`

### 🎯 Avantages du déploiement Docker

- ✅ **Environnement reproductible** sur tous les systèmes
- ✅ **Déploiement en une commande**
- ✅ **Isolation complète** des dépendances
- ✅ **Scalabilité** facile avec orchestrateurs
- ✅ **CI/CD ready** pour les pipelines