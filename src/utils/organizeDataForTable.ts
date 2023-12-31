import { TableHeader } from "../components/shared/Table";

type IndexedHeaders = {
  [key: string]: TableHeader;
};

type OrganizedItem = {
  [key: string]: any;
};

export default function organizeData(
  data: any[],
  headers: TableHeader[]
): [OrganizedItem[], IndexedHeaders] {
  const indexedHeaders: IndexedHeaders = {};

  headers.forEach((header) => {
    indexedHeaders[header.key] = {
      ...header,
    };
  });

  const headersKeysInOrder = Object.keys(indexedHeaders);

  const organizedData = data.map((item) => {
    const organizedItem: OrganizedItem = {};

    headersKeysInOrder.forEach((key) => {
      organizedItem[key] = item[key];
    });

    organizedItem.$original = item;

    return organizedItem;
  });

  return [organizedData, indexedHeaders];
}
