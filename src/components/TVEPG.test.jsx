import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TVEPG from './TVEPG';
import epg from '../mocks/epg.json';

describe('TVEPG', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render all data', async () => {
    const scrollToMock = vi.fn();

    vi.setSystemTime(1673962761681);
    Element.prototype.scrollTo = scrollToMock;

    render(
      <TVEPG channels={epg} startTime={1673946000000} endTime={1673942700000} />
    );

    expect(screen.getByText('La familia Mata')).toBeInTheDocument();
  });
});
