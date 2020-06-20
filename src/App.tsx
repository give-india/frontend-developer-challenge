import React from "react";
import "./App.css";

import { AddLink } from "./components/AddLink";
import { PlayAndQueue ,PQCard} from "./components/PlayAndQueue";
import { storageKey } from "./constants/constants";

export interface LinkEntry {
  link: string;
  id: number;
}

const App: React.FC = () => {
  const onAddEntry = (entry: LinkEntry) => {
    if (entries) {
      const newTasks = [...entries, entry];
      storeTaskEntries(newTasks);
    } else {
      storeTaskEntries([entry]);
    }
  };

  const loadTaskEntries = () => {
    const entriesString = window.localStorage.getItem(storageKey);
    const entries = entriesString ? JSON.parse(entriesString) : [];
    return entries;
  };

  const [entries, setEntries] = React.useState<LinkEntry[]>(loadTaskEntries());
  const storeTaskEntries = (entries: LinkEntry[]) => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
    setEntries(loadTaskEntries());
  };

  const onRemoveEntry = (id: number) => {
    if (entries) {
        const filteredTasks = entries.filter((entry: LinkEntry) => entry.id !== id);
        storeTaskEntries(filteredTasks);
    }
};

  return (
    <div className="App">
      <div className="link">
        <AddLink onChange={onAddEntry} />
      </div>
      <div className="queue">
        <PlayAndQueue entry={entries}>
        {entries.length > 0 ? (
                    entries.map((entry: LinkEntry) => (
                        <PQCard key={entry.id} entry={entry} onRemove={() => onRemoveEntry(entry.id)} />
                    ))
                ) : (
                    <p className="empty-text">Emtpy Queue. Add links first</p>
                )}
        </PlayAndQueue>
      </div>
    </div>
  );
};

export default App;
