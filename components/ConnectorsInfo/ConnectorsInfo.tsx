import classNames from "classnames";
import { sortBy } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { CONNECTORS } from "./ConnectorsInfo.constants";
import styles from "./ConnectorsInfo.module.css";

interface ConnectorCategory {
  connector: string;
  services: {
    url: string;
    icon: string;
    name: string;
  }[];
}

CONNECTORS.unshift({
  connector: "All connectors",
  services: CONNECTORS.reduce((prev, curr) => {
    return sortBy(
      [...prev, ...curr.services],
      [(connector) => connector.name.toLowerCase()]
    );
  }, [] as ConnectorCategory["services"]),
});

export default function ConnectorsInfo() {
  const [selectedTab, setSelectedTab] = useState<ConnectorCategory>(
    CONNECTORS[0]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.TabsContainer}>
        {CONNECTORS.map((connectorCategory) => (
          <div
            className={classNames(
              styles.TabItem,
              connectorCategory.connector === selectedTab.connector
                ? styles.SelectedTab
                : ""
            )}
            key={connectorCategory.connector}
            onClick={() => setSelectedTab(connectorCategory)}
          >
            {connectorCategory.connector}
          </div>
        ))}
      </div>
      <div className={styles.ConnectorsContainer}>
        <div className={styles.ConnectorsGridContainer}>
          {selectedTab.services.map((connector) => (
            <Link
              className={styles.ConnectorItem}
              href={connector.url}
              key={connector.name}
            >
              <img
                className={styles.ConnectorImg}
                src={connector.icon}
                alt={connector.name}
              />
              <p>{connector.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
