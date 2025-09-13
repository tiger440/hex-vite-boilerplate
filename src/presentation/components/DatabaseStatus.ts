export class DatabaseStatus {
  private container: HTMLDivElement;

  constructor(private databaseMode: string) {
    this.container = this.createContainer();
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'database-status';

    const isSupabase = this.databaseMode === 'supabase';
    const statusClass = isSupabase ? 'supabase' : 'memory';
    const icon = isSupabase ? '🗄️' : '💾';
    const label = isSupabase ? 'Supabase' : 'Mémoire';
    const description = isSupabase
      ? 'Base de données persistante'
      : 'Stockage temporaire (données perdues au rechargement)';

    container.innerHTML = `
      <div class="status-indicator ${statusClass}">
        <div class="status-header">
          <span class="status-icon">${icon}</span>
          <div class="status-info">
            <span class="status-label">Mode: ${label}</span>
            <span class="status-description">${description}</span>
          </div>
        </div>
        ${!isSupabase ? `
          <div class="setup-hint">
            <span>💡 Configurez Supabase pour une base de données persistante</span>
            <a href="#" class="setup-link" data-action="show-setup">Guide de configuration</a>
          </div>
        ` : ''}
      </div>
    `;

    // Add event listener for setup link
    const setupLink = container.querySelector('.setup-link');
    if (setupLink) {
      setupLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSetupModal();
      });
    }

    return container;
  }

  private showSetupModal(): void {
    const modal = document.createElement('div');
    modal.className = 'setup-modal';
    modal.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-content">
          <div class="modal-header">
            <h3>🚀 Configuration Supabase</h3>
            <button class="modal-close" data-action="close-modal">×</button>
          </div>
          <div class="modal-body">
            <p>Pour configurer Supabase et avoir une base de données persistante :</p>
            <ol>
              <li>Créez un compte sur <a href="https://supabase.com" target="_blank">supabase.com</a></li>
              <li>Créez un nouveau projet</li>
              <li>Exécutez le script SQL fourni (<code>supabase-setup.sql</code>)</li>
              <li>Copiez vos clés dans le fichier <code>.env</code></li>
              <li>Changez <code>VITE_DATABASE_MODE=supabase</code></li>
            </ol>
            <p><strong>📖 Guide complet :</strong> Consultez <code>SUPABASE_SETUP.md</code> pour les instructions détaillées.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-action="close-modal">Compris !</button>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    const closeButtons = modal.querySelectorAll('[data-action="close-modal"]');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    });

    // Close on backdrop click
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        document.body.removeChild(modal);
      }
    });

    document.body.appendChild(modal);
  }

  render(): HTMLDivElement {
    return this.container;
  }

  updateMode(newMode: string): void {
    this.databaseMode = newMode;
    const newContainer = this.createContainer();
    this.container.parentNode?.replaceChild(newContainer, this.container);
    this.container = newContainer;
  }
}