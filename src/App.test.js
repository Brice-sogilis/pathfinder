import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import {App, defaultPathFinderWidth, defaultPathFinderHeight} from './App';
import {PathFinder} from './PathFinder';

const defaultTileRegexp = /\*/
const blockedTileRegexp = /#/

function expectEmpty(arr) {
  expect(arr.length).toBe(0);
}

function expectNotEmpty(arr, exactSize=null) {
  expect(arr.length).not.toBe(0);
  if(exactSize){
    expect(arr.length).toBe(exactSize);
  }
}

test('Title rendered correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/pathfinder/i);
  expect(linkElement).toBeInTheDocument();
});

test('Default grid rendered with correct dimensions', () => {
  render(<App />);
  const allDefaultTiles = screen.getAllByPlaceholderText(defaultTileRegexp);
  expectNotEmpty(allDefaultTiles, defaultPathFinderWidth * defaultPathFinderHeight);
});



test('Clicking an initial block should set it to blocked', () => {
  render(<App />);
  const oneFreeTile = screen.getAllByPlaceholderText(defaultTileRegexp)[0];
  expect(oneFreeTile).toBeInTheDocument();
  fireEvent.click(oneFreeTile);
  const allFreeTilesAfterUpdate = screen.getAllByPlaceholderText(defaultTileRegexp);
  expect(allFreeTilesAfterUpdate.length).toBe(defaultPathFinderWidth * defaultPathFinderHeight - 1);
  const allBlockedTiles = screen.getAllByPlaceholderText(blockedTileRegexp);
  expectNotEmpty(allBlockedTiles, 1);
  const oneBlockedTile = allBlockedTiles[0];
  fireEvent.click(oneBlockedTile);
  const allFreeTilesAfterTwoUpdates = screen.getAllByPlaceholderText(defaultTileRegexp);
  expectNotEmpty(allFreeTilesAfterTwoUpdates, defaultPathFinderHeight * defaultPathFinderWidth);
});
