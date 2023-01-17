import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import WebEPG from './WebEPG';
import epg from '../mocks/epg.json';

describe('WebEPG', () => {
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
      <WebEPG
        channels={epg}
        startTime={1673946000000}
        endTime={1673942700000}
      />
    );

    expect(screen.getByText('La familia Mata')).toBeInTheDocument();
  });

  it('should scroll to current time', async () => {
    const scrollToMock = vi.fn();

    vi.setSystemTime(1673962761681);
    Element.prototype.scrollTo = scrollToMock;

    render(
      <WebEPG
        channels={epg}
        startTime={1673946000000}
        endTime={1673942700000}
      />
    );

    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'auto',
      left: 1072.747584
    });
  });
});
