import { UserResponseDto } from '../../application/dto/CreateUserDto';

export class UserList {
  private container: HTMLDivElement;
  private users: UserResponseDto[] = [];

  constructor() {
    this.container = this.createContainer();
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'user-list';
    return container;
  }

  private renderUsers(): void {
    this.container.innerHTML = '';

    if (this.users.length === 0) {
      this.container.innerHTML = '<p>No users found</p>';
      return;
    }

    const list = document.createElement('ul');
    this.users.forEach(user => {
      const item = document.createElement('li');
      item.className = 'user-item';
      item.innerHTML = `
        <div class="user-info">
          <strong>${user.name}</strong>
          <span>${user.email}</span>
          <small>Created: ${new Date(user.createdAt).toLocaleDateString()}</small>
        </div>
      `;
      list.appendChild(item);
    });

    this.container.appendChild(list);
  }

  setUsers(users: UserResponseDto[]): void {
    this.users = users;
    this.renderUsers();
  }

  addUser(user: UserResponseDto): void {
    this.users.push(user);
    this.renderUsers();
  }

  render(): HTMLDivElement {
    return this.container;
  }
}