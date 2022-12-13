import React from "react";
import renderer from "react-test-renderer";
import Projects from "../pages/projectsPage";
import { JSDOM } from "jsdom";
import { fireEvent, screen } from "@testing-library/react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { mockComponent } from "react-dom/test-utils";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { render, waitFor } from "@testing-library/react";

describe(" test of projekt page", () => {
  it("Project", () => {
    render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );

    screen.debug();
  });
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const dummyProjects = [
  {
    id: "1",
    name: "file1.jpg",
    fileType: "jpg",
    language: "js",
  },
  {
    id: "2",
    name: "file1.jpg",
    fileType: "jpg",
    language: "js",
  },
  {
    id: "3",
    name: "file1.jpg",
    fileType: "jpg",
    language: "js",
  },
  {
    id: "4",
    name: "file1.jpg",
    fileType: "jpg",
    language: "js",
  },
];

test("dropdown button on screen", async () => {
  mockedAxios.get.mockResolvedValue(dummyProjects);
  const screen = render(
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );

  const buttonClicked = await waitFor(() =>
    screen.findByDisplayValue("Dropdown button")
  );
  expect(buttonClicked).toHaveLength(1);
});
test("dropdown button click simulation", async () => {
  mockedAxios.get.mockResolvedValue(dummyProjects);
  const screen = render(
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );

  const buttonClicked = await waitFor(() =>
    screen.findByDisplayValue("Dropdown button")
  );
  expect(buttonClicked).toHaveBeenCalled();
});
test("projects list", async () => {
  mockedAxios.get.mockResolvedValue(dummyProjects);
  const screen = render(
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );

  const projectsList = await waitFor(() => screen.findAllByTestId("Titel"));
  expect(projectsList).toHaveLength(4);
});

test("download button", async () => {
  mockedAxios.get.mockResolvedValue(dummyProjects);
  const screen = render(
    <BrowserRouter>
      <Projects />
    </BrowserRouter>
  );

  const projectsList = await waitFor(() => screen.findAllByTestId("Download"));
  expect(projectsList);
});
