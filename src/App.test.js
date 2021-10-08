import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import {App, defaultPathFinderWidth, defaultPathFinderHeight} from './App';
import {PathFinder, TileType, SelectionMode} from './PathFinder';

const defaultTileRegexp = /\*/
const blockedTileRegexp = /#/
const blockModeToggleRegexp = /block-toggle/
const pathTileRegexp = /O/

function expectEmpty(arr) {
  expect(arr.length).toBe(0);
  expect(arr).toHaveLength(0);
}

function expectNotEmpty(arr, exactSize=null) {
  expect(arr.length).not.toBe(0);
  if(exactSize){
    expect(arr.length).toBe(exactSize);
  }
}

afterEach(cleanup)

function getOneFreeTile() {
  return screen.getAllByPlaceholderText(defaultTileRegexp)[0];
}

function getOneBlockedTile() {
  return screen.getAllByPlaceholderText(blockedTileRegexp)[0];
}

function getAllTileOfType(type) {
  const res = screen.queryAllByPlaceholderText(type);
  return (res) ? res : [];
}

function getAllFreeTiles() {
  return getAllTileOfType(defaultTileRegexp);
}

function getAllBlockedTiles() {
  return getAllTileOfType(blockedTileRegexp);
}

function getAllPathTiles() {
  return getAllTileOfType(pathTileRegexp)
}

function getSelectionModeToggleButton() {
  return screen.getByPlaceholderText(blockModeToggleRegexp);
}

function toggleSelectionMode() {
  fireEvent.click(getSelectionModeToggleButton());
}

test('Title rendered correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/pathfinder/i);
  expect(linkElement).toBeInTheDocument();
});

test('Default grid rendered with correct dimensions', () => {
  render(<App />);
  const allDefaultTiles = getAllFreeTiles();
  const allBlockedTiles = screen.queryAllByPlaceholderText(blockedTileRegexp);
  expectNotEmpty(allDefaultTiles, defaultPathFinderWidth * defaultPathFinderHeight);
  expectEmpty(allBlockedTiles);
});

test('Clicking an initial tile should set it to blocked', () => {
  render(<App />);
  const oneFreeTile = getOneFreeTile();
  expect(oneFreeTile).toBeInTheDocument();
  fireEvent.click(oneFreeTile);
  const allFreeTilesAfterUpdate = getAllFreeTiles();
  expect(allFreeTilesAfterUpdate.length).toBe(defaultPathFinderWidth * defaultPathFinderHeight - 1);
  const allBlockedTiles = getAllBlockedTiles();
  expectNotEmpty(allBlockedTiles, 1);
  const oneBlockedTile = allBlockedTiles[0];
  fireEvent.click(oneBlockedTile);
  const allFreeTilesAfterTwoUpdates = getAllFreeTiles();
  expectNotEmpty(allFreeTilesAfterTwoUpdates, defaultPathFinderHeight * defaultPathFinderWidth);
});

test('Block mode toggle button rendered correctly', () => {
  render(<App />);
  const blockModeToggle = screen.getByPlaceholderText(blockModeToggleRegexp);
  expect(blockModeToggle).toBeInTheDocument();
});

test('Clicking block mode toggle button should disable block mode', () => {
  render(<App />);
  const oneFreeTile = getOneFreeTile();
  const allBlockedTilesBeforeClick = getAllBlockedTiles();
  toggleSelectionMode();
  fireEvent.click(oneFreeTile); //Click on a tile
  const allBlockedTilesAfterClick = getAllBlockedTiles();
  expect(allBlockedTilesBeforeClick.length).toBe(allBlockedTilesAfterClick.length);
});

test('Clicking a free tile when in path mode should set it to path', () => {
  render(<App />);
  toggleSelectionMode();
  expectEmpty(getAllPathTiles());
  fireEvent.click(getOneFreeTile());
  expectNotEmpty(getAllPathTiles(),1);
});

