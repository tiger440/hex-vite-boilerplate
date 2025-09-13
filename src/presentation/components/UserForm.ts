export class UserForm {
  private form: HTMLFormElement;
  private onSubmit: (data: { email: string; name: string }) => void;

  constructor(onSubmit: (data: { email: string; name: string }) => void) {
    this.onSubmit = onSubmit;
    this.form = this.createForm();
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form');
    form.className = 'user-form';
    form.innerHTML = `
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <button type="submit">Create User</button>
    `;

    form.addEventListener('submit', this.handleSubmit.bind(this));
    return form;
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const formData = new FormData(this.form);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    if (email && name) {
      this.onSubmit({ email, name });
    }
  }

  render(): HTMLFormElement {
    return this.form;
  }

  reset(): void {
    this.form.reset();
  }
}