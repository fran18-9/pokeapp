import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';

describe('Card component', () => {
    it('renders the Pokemon name', () => {
        const data = {
            name: 'pikachu',
        };
        render(<Card data={data} />);
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    });
});
