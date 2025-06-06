import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SobrePage from '../app/Cliente/Sobre/page';
const React = require('react');

// filepath: c:\Users\Irineu\elo-drink-app-1\src\tests\Sobre.test.js

// Mock framer-motion to render children directly
jest.mock('framer-motion', () => {
    return {
        motion: {
            div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
            h2: React.forwardRef((props, ref) => <h2 ref={ref} {...props} />),
        },
    };
});

describe('SobrePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza a seção do banner com título e descrição', () => {
        render(<SobrePage />);
        expect(screen.getByAltText('Elo Drinks Banner')).toBeInTheDocument();
        expect(screen.getByText(/Celebre momentos únicos/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Com os melhores drinks, atendimento impecável/i)
        ).toBeInTheDocument();
    });

    it('renderiza a seção Sobre o Elo Drinks', () => {
        render(<SobrePage />);
        expect(screen.getByText(/Sobre a Elo Drinks/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Desde 2016, a Elo Drinks é referência em coquetelaria personalizada/i)
        ).toBeInTheDocument();
        expect(screen.getByAltText('Imagem da empresa')).toBeInTheDocument();
    });

    it('renderiza a seção Nosso Fundador', () => {
        render(<SobrePage />);
        expect(screen.getByText(/Nosso Fundador/i)).toBeInTheDocument();
        expect(
            screen.getByText(/À frente da Elo Drinks está o empresário Roberto Vitta/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Roberto acredita que a verdadeira experiência de um evento vai além dos drinks/i)
        ).toBeInTheDocument();
        expect(screen.getByAltText(/Roberto Vitta - Fundador/i)).toBeInTheDocument();
    });

    it('renderiza a lista de tipos de eventos', () => {
        render(<SobrePage />);
        expect(screen.getByText(/Alguns eventos que realizamos/i)).toBeInTheDocument();
        expect(screen.getByText('Casamentos')).toBeInTheDocument();
        expect(screen.getByText('Aniversários/Debutante')).toBeInTheDocument();
        expect(screen.getByText('Corporativos')).toBeInTheDocument();
        expect(screen.getByText('Kids')).toBeInTheDocument();
        expect(screen.getByAltText('Casamentos')).toBeInTheDocument();
        expect(screen.getByAltText('Aniversários/Debutante')).toBeInTheDocument();
        expect(screen.getByAltText('Corporativos')).toBeInTheDocument();
        expect(screen.getByAltText('Kids')).toBeInTheDocument();
    });

    it('renderiza a seção de marcas confiáveis ​​com várias imagens de marcas', () => {
        render(<SobrePage />);
        expect(screen.getByText(/Marcas que confiam em nós/i)).toBeInTheDocument();
        // There should be more than 10 brand images due to repetition
        const brandImages = screen.getAllByAltText(/Marca \d+/i);
        expect(brandImages.length).toBeGreaterThan(10);
        brandImages.forEach(img => {
            expect(img).toHaveClass('object-contain');
        });
    });

    it('renderiza todos os fundos decorativos', () => {
        render(<SobrePage />);
        // There are two "Fundo decorativo" images, one in each section
        const backgrounds = screen.getAllByAltText('Fundo decorativo');
        expect(backgrounds.length).toBeGreaterThanOrEqual(2);
    });

    it('renderiza todas as seções principais em ordem', () => {
        render(<SobrePage />);
        const headings = screen.getAllByRole('heading', { level: 2 });
        expect(headings[0]).toHaveTextContent('Celebre momentos únicos');
        expect(headings[1]).toHaveTextContent('Alguns eventos que realizamos');
        expect(headings[2]).toHaveTextContent('Marcas que confiam em nós');
    });
});