import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button component', () => {
  it('Renders a button with the correct styles and text', () => {
    render(<Button>Click me!</Button>);
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-[38px] rounded border border-grey px-3 py-2 text-sm font-medium text-white transition-colors bg-black');
  });

  it('Disables the button when the disabled prop is true', () => {
    render(<Button disabled>Click me!</Button>);
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-[38px] rounded border border-grey px-3 py-2 text-sm font-medium text-white transition-colors bg-grey');
    expect(button).toBeDisabled();
  });

  it('Calls the onClick function when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me!</Button>);
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
