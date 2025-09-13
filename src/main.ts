import './style.css';
import { LandingPage } from './presentation/pages/LandingPage';
import { DIContainer } from './container/DIContainer';
import { UserForm } from './presentation/components/UserForm';
import { UserList } from './presentation/components/UserList';
import { DatabaseStatus } from './presentation/components/DatabaseStatus';

const app = document.querySelector<HTMLDivElement>('#app')!;

const landingPage = new LandingPage();
app.appendChild(landingPage.render());

const container = DIContainer.getInstance();
const userController = container.getUserController();
const userRepository = container.getUserRepository();
const databaseMode = container.getDatabaseMode();

function setupDemoApp() {
  const demoAppContainer = document.querySelector('#demo-app');
  if (!demoAppContainer) return;

  demoAppContainer.innerHTML = `
    <div>
      <div id="database-status"></div>
      <h3>Démonstration Interactive</h3>
      <p>Testez la création d'utilisateurs avec validation métier intégrée</p>
      <div class="app-container">
        <div class="form-section">
          <h4>Créer un utilisateur</h4>
          <div id="demo-user-form"></div>
        </div>
        <div class="list-section">
          <h4>Utilisateurs créés</h4>
          <div id="demo-user-list"></div>
        </div>
      </div>
    </div>
  `;

  // Add database status component
  const databaseStatus = new DatabaseStatus(databaseMode);
  const statusContainer = document.querySelector('#database-status')!;
  statusContainer.appendChild(databaseStatus.render());

  const userList = new UserList();
  const userListContainer = document.querySelector('#demo-user-list')!;
  userListContainer.appendChild(userList.render());

  const userForm = new UserForm(async (data) => {
    try {
      const newUser = await userController.createUser(data);
      userList.addUser(newUser);
      userForm.reset();

      const successMessage = document.createElement('div');
      successMessage.textContent = '✅ Utilisateur créé avec succès !';
      successMessage.style.cssText = 'color: #10b981; padding: 8px; margin-top: 8px; background: rgba(16, 185, 129, 0.1); border-radius: 4px; font-size: 14px;';

      const formContainer = document.querySelector('#demo-user-form');
      if (formContainer) {
        const existingMessage = formContainer.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();

        successMessage.className = 'success-message';
        formContainer.appendChild(successMessage);

        setTimeout(() => successMessage.remove(), 3000);
      }
    } catch (error) {
      const errorMessage = document.createElement('div');
      errorMessage.textContent = `❌ Erreur: ${error}`;
      errorMessage.style.cssText = 'color: #ef4444; padding: 8px; margin-top: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; font-size: 14px;';

      const formContainer = document.querySelector('#demo-user-form');
      if (formContainer) {
        const existingMessage = formContainer.querySelector('.error-message');
        if (existingMessage) existingMessage.remove();

        errorMessage.className = 'error-message';
        formContainer.appendChild(errorMessage);

        setTimeout(() => errorMessage.remove(), 5000);
      }
    }
  });

  const userFormContainer = document.querySelector('#demo-user-form')!;
  userFormContainer.appendChild(userForm.render());

  async function loadUsers() {
    try {
      const users = await userRepository.findAll();
      const userDtos = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }));
      userList.setUsers(userDtos);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  loadUsers();
}

setTimeout(setupDemoApp, 100);