import Login from './Login';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/vue';
import axios from 'axios';

jest.spyOn(axios, 'post').mockResolvedValue(true);

function renderComponent() {
  render(Login);
}

describe('Login.vue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the box with the welcome message', () => {
    renderComponent();

    const el = screen.getByRole('heading', { name: /welcome to your dashboard/i });

    expect(el).toBeInTheDocument();
  });

  it('should display an input type[email]', () => {
    renderComponent();

    const el = screen.getByRole('textbox', { name: /email/i });

    expect(el).toBeInTheDocument();
  });

  it('should display an input type[password]', () => {
    renderComponent();

    const el = screen.getByLabelText(/password/i);

    expect(el).toBeInTheDocument();
  });

  it('should display a submit button', () => {
    renderComponent();

    const el = screen.getByRole('button', { name: /log in/i });

    expect(el).toBeInTheDocument();
    expect(el).toHaveProperty('type', 'submit');
  });

  it('should ensure both fields have placeholder text', () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
  });

  it('should NOT make a POST call on form submit when form data is not fully filled', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });

    await userEvent.click(button);

    expect(axios.post).not.toHaveBeenCalled();
  });

  // it('should display feedback when fields are missing');
  it('should make a POST call on form submit', async () => {
    // AAA

    // Arrange
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    // Act
    await userEvent.type(field1, 'vedovelli@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    // Assert
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/login', { email: 'vedovelli@gmail.com', password: '123456789' });
  });

  it('should clear form fields on submit success', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    await userEvent.type(field1, 'vedovelli@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    await waitFor(() => {
      expect(field1.value).toEqual('');
      expect(field2.value).toEqual('');
    });
  });

  it('should toggle disable submit button during submit', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    expect(button).toBeEnabled();

    await userEvent.type(field1, 'vedovelli@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });

  it('should toggle button label during submit', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    expect(button.textContent).toEqual('Log In');

    await userEvent.type(field1, 'vedovelli@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    expect(button.textContent).toEqual('Please wait...');
  });

  it('should toggle disable both fields during submit', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    expect(field1).toBeEnabled();
    expect(field2).toBeEnabled();

    await userEvent.type(field1, 'vedovelli@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    expect(field1).toBeDisabled();
    expect(field2).toBeDisabled();
  });

  it('should display a message when credentials are not valid', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue({ error: 'Some error here' });

    renderComponent();

    const button = screen.getByRole('button', { name: /log in/i });
    const field1 = screen.getByPlaceholderText(/you@example.com/i);
    const field2 = screen.getByPlaceholderText(/Your password/i);

    await userEvent.type(field1, 'vedovelli2@gmail.com');
    await userEvent.type(field2, '123456789');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Login Unsuccessful/i)).toBeInTheDocument();
    });
  });
});
