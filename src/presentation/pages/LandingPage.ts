export class LandingPage {
  private container: HTMLDivElement;

  constructor() {
    this.container = this.createContainer();
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'landing-page';
    container.innerHTML = this.getHTML();
    this.attachEventListeners(container);
    return container;
  }

  private getHTML(): string {
    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-background">
          <div class="geometric-shapes">
            <div class="shape hexagon"></div>
            <div class="shape circle"></div>
            <div class="shape triangle"></div>
          </div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">⚡</span>
            <span>Architecture moderne</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">Architecture Hexagonale</span><br>
            <span class="subtitle">Boilerplate avec Vite & TypeScript</span>
          </h1>
          <p class="hero-description">
            Un template robuste et maintenable pour vos applications TypeScript.
            Séparez votre logique métier de vos détails techniques avec élégance.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-action="demo">
              <span>Voir la démo</span>
              <svg class="btn-icon" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
            <button class="btn btn-secondary" data-action="github">
              <span>GitHub</span>
              <svg class="btn-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.606 9.606 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Pourquoi choisir</span>
            <h2>L'Architecture Hexagonale ?</h2>
            <p>Une approche moderne pour construire des applications maintenables et testables</p>
          </div>
          <div class="features-grid">
            <div class="feature-card" data-aos="fade-up">
              <div class="feature-icon">🔧</div>
              <h3>Testabilité</h3>
              <p>Logique métier isolée et facilement testable avec des mocks et des tests unitaires complets</p>
            </div>
            <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div class="feature-icon">🔄</div>
              <h3>Flexibilité</h3>
              <p>Changez facilement de base de données, API externe ou framework sans impacter votre logique métier</p>
            </div>
            <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div class="feature-icon">🏗️</div>
              <h3>Maintenabilité</h3>
              <p>Code organisé en couches avec des responsabilités claires et une séparation nette des préoccupations</p>
            </div>
            <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div class="feature-icon">⚡</div>
              <h3>Performance</h3>
              <p>Architecture optimisée avec Vite pour des temps de compilation ultra-rapides</p>
            </div>
            <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div class="feature-icon">📦</div>
              <h3>Modulaire</h3>
              <p>Composants réutilisables et structure modulaire pour une meilleure organisation du code</p>
            </div>
            <div class="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div class="feature-icon">🔒</div>
              <h3>Type-safe</h3>
              <p>TypeScript intégré avec configuration stricte pour une meilleure robustesse du code</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Architecture Section -->
      <section class="architecture">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Structure</span>
            <h2>Architecture en Couches</h2>
            <p>Une organisation claire et logique de votre code</p>
          </div>
          <div class="architecture-diagram">
            <div class="layer presentation" data-aos="slide-right">
              <div class="layer-content">
                <div class="layer-icon">🎨</div>
                <h3>Presentation</h3>
                <p>Interface utilisateur, contrôleurs et composants visuels</p>
                <div class="layer-tech">Components • Controllers • UI</div>
              </div>
            </div>
            <div class="layer application" data-aos="slide-right" data-aos-delay="100">
              <div class="layer-content">
                <div class="layer-icon">⚙️</div>
                <h3>Application</h3>
                <p>Cas d'usage et orchestration de la logique métier</p>
                <div class="layer-tech">Use Cases • DTOs • Services</div>
              </div>
            </div>
            <div class="layer domain" data-aos="slide-right" data-aos-delay="200">
              <div class="layer-content">
                <div class="layer-icon">💎</div>
                <h3>Domain</h3>
                <p>Entités métier et règles de gestion pures</p>
                <div class="layer-tech">Entities • Repositories • Domain Services</div>
              </div>
            </div>
            <div class="layer infrastructure" data-aos="slide-right" data-aos-delay="300">
              <div class="layer-content">
                <div class="layer-icon">🔧</div>
                <h3>Infrastructure</h3>
                <p>Implémentations techniques et adaptateurs externes</p>
                <div class="layer-tech">Database • HTTP • External APIs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Section -->
      <section class="demo" id="demo">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">Démonstration</span>
            <h2>Voir en Action</h2>
            <p>Un exemple concret d'implémentation avec gestion d'utilisateurs</p>
          </div>
          <div class="demo-container">
            <div class="demo-sidebar">
              <div class="demo-tabs">
                <button class="demo-tab active" data-tab="example">Exemple Live</button>
                <button class="demo-tab" data-tab="code">Code Source</button>
              </div>
              <div class="demo-info">
                <h4>🎯 Fonctionnalités démo</h4>
                <ul>
                  <li>✅ Création d'utilisateurs</li>
                  <li>✅ Validation métier</li>
                  <li>✅ Gestion d'erreurs</li>
                  <li>✅ Interface réactive</li>
                </ul>
              </div>
            </div>
            <div class="demo-content">
              <div class="demo-panel active" data-panel="example">
                <div class="demo-app" id="demo-app">
                  <!-- Demo app will be inserted here -->
                </div>
              </div>
              <div class="demo-panel" data-panel="code">
                <div class="code-preview">
                  <pre><code class="language-typescript">// Domain Entity
export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(email: string, name: string): UserEntity {
    const now = new Date();
    const id = crypto.randomUUID();
    return new UserEntity(id, email, name, now, now);
  }
}

// Use Case
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise&lt;UserResponseDto&gt; {
    if (!UserService.canCreateUser(dto.email, dto.name)) {
      throw new Error('Invalid user data');
    }

    const user = UserEntity.create(dto.email, dto.name);
    return await this.userRepository.save(user);
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2>Prêt à commencer ?</h2>
            <p>Lancez votre projet avec une architecture solide et moderne</p>
            <div class="cta-actions">
              <button class="btn btn-primary" data-action="github">
                <span>Cloner le projet</span>
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path d="M19 12v7H5v-7M12 4l0 12m4-4l-4 4-4-4"/>
                </svg>
              </button>
              <button class="btn btn-outline" data-action="docs">
                <span>Documentation</span>
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </button>
            </div>
            <div class="cta-command">
              <code>npm create vite@latest my-app -- --template hexagonal</code>
              <button class="copy-btn" data-copy="npm create vite@latest my-app -- --template hexagonal">
                <svg viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private attachEventListeners(container: HTMLDivElement): void {
    // Demo tabs
    const demoTabs = container.querySelectorAll('.demo-tab');
    const demoPanels = container.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('data-tab');

        demoTabs.forEach(t => t.classList.remove('active'));
        demoPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = container.querySelector(`[data-panel="${targetPanel}"]`);
        if (panel) panel.classList.add('active');
      });
    });

    // Smooth scroll for demo button
    const demoBtn = container.querySelector('[data-action="demo"]');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const demoSection = container.querySelector('#demo');
        if (demoSection) {
          demoSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Copy button
    const copyBtn = container.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy);
          copyBtn.classList.add('copied');
          setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        }
      });
    }

    // GitHub button
    const githubBtns = container.querySelectorAll('[data-action="github"]');
    githubBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('GitHub repository would open here');
      });
    });
  }

  render(): HTMLDivElement {
    return this.container;
  }
}