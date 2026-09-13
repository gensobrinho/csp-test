import { describe, expect, it } from '@jest/globals';
import { canDragDemand, canMoveDemandStatus } from '../../utils/canDragDemand';

describe('canDragDemand', () => {
  it('should allow drag for authenticated roles', () => {
    expect(canDragDemand('admin')).toBe(true);
    expect(canDragDemand('agilist')).toBe(true);
    expect(canDragDemand('developer')).toBe(true);
  });

  it('should block drag when there is no role', () => {
    expect(canDragDemand(undefined)).toBe(false);
  });
});

describe('canMoveDemandStatus', () => {
  it('should block moves from production to another status', () => {
    expect(canMoveDemandStatus('in_production', 'paused')).toBe(false);
  });

  it('should block dropping on the same column', () => {
    expect(canMoveDemandStatus('not_started', 'not_started')).toBe(false);
  });

  it('should allow moving between unlocked statuses', () => {
    expect(canMoveDemandStatus('not_started', 'in_progress')).toBe(true);
  });
});
