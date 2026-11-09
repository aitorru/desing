import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Status, type StatusTone } from "../Status/Status";
import { DataTable, type DataTableColumn } from "./DataTable";

interface Host {
  name: string;
  status: StatusTone;
  state: string;
  zone: string;
  cpu: number;
  mem: number;
  uptime: string;
}

const HOSTS: Host[] = [
  {
    name: "node-a1",
    status: "ok",
    state: "Listo",
    zone: "eu-west-1a",
    cpu: 41,
    mem: 63,
    uptime: "41 d",
  },
  {
    name: "node-a2",
    status: "ok",
    state: "Listo",
    zone: "eu-west-1a",
    cpu: 37,
    mem: 58,
    uptime: "41 d",
  },
  {
    name: "node-b1",
    status: "warn",
    state: "Presión de memoria",
    zone: "eu-west-1b",
    cpu: 72,
    mem: 91,
    uptime: "12 d",
  },
  {
    name: "node-b2",
    status: "running",
    state: "Drenando",
    zone: "eu-west-1b",
    cpu: 9,
    mem: 22,
    uptime: "12 d",
  },
  {
    name: "node-c1",
    status: "error",
    state: "No responde",
    zone: "eu-west-1c",
    cpu: 0,
    mem: 0,
    uptime: "—",
  },
];

const COLUMNS: DataTableColumn<Host>[] = [
  { key: "name", header: "Nodo", mono: true, sortable: true },
  { key: "status", header: "Estado", cell: (h) => <Status tone={h.status}>{h.state}</Status> },
  { key: "zone", header: "Zona", mono: true, sortable: true },
  { key: "cpu", header: "CPU", numeric: true, sortable: true, cell: (h) => `${h.cpu} %` },
  { key: "mem", header: "Memoria", numeric: true, sortable: true, cell: (h) => `${h.mem} %` },
  { key: "uptime", header: "Activo", numeric: true },
];

const meta: Meta = {
  title: "DevOps/DataTable",
  parameters: { layout: "padded" },
};
export default meta;

/** Click a header to sort; the lit dot shows the direction. */
export const Hosts: StoryObj = {
  render: () => (
    <DataTable
      caption="Nodos del clúster de producción"
      columns={COLUMNS}
      rows={HOSTS}
      rowKey={(h) => h.name}
      defaultSort={{ key: "cpu", direction: "desc" }}
    />
  ),
};

/** `compact` rows, and rows that open something: click one (or Tab + Enter). */
export const CompactSelectable: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState("node-b1");
    return (
      <DataTable
        caption="Nodos"
        hideCaption
        density="compact"
        columns={COLUMNS}
        rows={HOSTS}
        rowKey={(h) => h.name}
        selectedKey={selected}
        onRowClick={(h) => setSelected(h.name)}
      />
    );
  },
};

export const Empty: StoryObj = {
  render: () => (
    <DataTable
      caption="Nodos"
      hideCaption
      columns={COLUMNS}
      rows={[]}
      rowKey={(h) => h.name}
      empty="Ningún nodo coincide con el filtro"
    />
  ),
};
