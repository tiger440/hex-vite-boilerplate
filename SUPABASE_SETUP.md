# 🚀 Configuration Supabase - Guide Complet

Ce guide vous explique comment configurer Supabase avec votre boilerplate d'architecture hexagonale en quelques minutes.

## 📋 Étapes de Configuration

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub
4. Cliquez sur "New Project"
5. Choisissez votre organisation
6. Remplissez les informations :
   - **Name** : `hexagonal-boilerplate` (ou votre nom)
   - **Database Password** : Générez un mot de passe fort
   - **Region** : Choisissez la région la plus proche
7. Cliquez sur "Create new project"

### 2. Configurer la base de données

1. Dans votre projet Supabase, allez dans l'onglet **SQL Editor**
2. Cliquez sur "New query"
3. Copiez le contenu du fichier `supabase-setup.sql` dans l'éditeur
4. Cliquez sur "Run" pour exécuter le script

Cela va créer :
- ✅ La table `users` avec les colonnes appropriées
- ✅ Les index pour les performances
- ✅ Les politiques RLS (Row Level Security)
- ✅ Les triggers pour `updated_at`
- ✅ Des données de test (optionnel)

### 3. Récupérer les clés d'API

1. Allez dans l'onglet **Settings** → **API**
2. Copiez les informations suivantes :
   - **Project URL** : `https://xxxxxxxxxx.supabase.co`
   - **anon public key** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Configurer les variables d'environnement

1. Ouvrez le fichier `.env` dans votre projet
2. Remplacez les valeurs par défaut :

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon_ici

# Database Mode - Changez en 'supabase' pour utiliser Supabase
VITE_DATABASE_MODE=supabase
```

### 5. Tester la configuration

1. Redémarrez votre serveur de développement :
```bash
npm run dev
```

2. Ouvrez http://localhost:5173
3. Regardez la console du navigateur, vous devriez voir :
```
✅ Using Supabase database
```

4. Testez la création d'utilisateurs dans la démo
5. Vérifiez dans Supabase → **Table Editor** → **users** que les données sont bien sauvegardées

## 🔧 Configuration Avancée

### Sécurité RLS

Les politiques RLS sont configurées pour permettre l'accès public (parfait pour une démo). Pour un environnement de production, modifiez les politiques dans Supabase :

```sql
-- Exemple : Limiter l'accès aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can read users"
ON public.users FOR SELECT
USING (auth.role() = 'authenticated');
```

### Variables d'environnement pour la production

Pour la production, utilisez des variables d'environnement sécurisées :

- Vercel : Settings → Environment Variables
- Netlify : Site settings → Environment variables
- Autres : Suivez la documentation de votre plateforme

## ✅ Modes de fonctionnement

### Mode Mémoire (par défaut)
```env
VITE_DATABASE_MODE=memory
```
- 💾 Stockage temporaire en mémoire
- 🚀 Parfait pour le développement/démo
- 🔄 Les données sont perdues au rechargement

### Mode Supabase
```env
VITE_DATABASE_MODE=supabase
```
- 🗄️ Stockage persistant dans PostgreSQL
- 🌐 Accessible depuis partout
- 🔒 Sécurisé avec RLS

## 🆘 Dépannage

### Erreur "Missing Supabase configuration"
- ✅ Vérifiez que les variables d'environnement sont correctes
- ✅ Redémarrez le serveur de développement
- ✅ Vérifiez que les clés ne contiennent pas d'espaces

### Erreur "Failed to save user"
- ✅ Vérifiez que le script SQL a été exécuté
- ✅ Vérifiez les politiques RLS dans Supabase
- ✅ Regardez les logs dans Supabase → Logs

### Mode de fallback
Si Supabase n'est pas configuré correctement, l'application bascule automatiquement en mode mémoire avec ce message :
```
⚠️ Supabase not configured, falling back to in-memory database
```

## 🎉 C'est terminé !

Votre application utilise maintenant Supabase ! L'architecture hexagonale permet de basculer facilement entre les différents modes de stockage sans modifier la logique métier.

### Prochaines étapes possibles :
- 🔐 Ajouter l'authentification Supabase
- 📊 Créer d'autres entités (produits, commandes...)
- 🔍 Implémenter la recherche et les filtres
- 📱 Ajouter une API REST avec les endpoints