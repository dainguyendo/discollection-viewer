import { Release } from "@/components/Release";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Collection as CollectionType } from "@/lib/types";

interface CollectionAtFormatProps {
  data: CollectionType[keyof CollectionType];
}

export const CollectionAtFormat = ({ data }: CollectionAtFormatProps) => {
  return <CollectionNode data={data} />;
};

interface CollectionNodeProps {
  data: CollectionType[keyof CollectionType];
  parent?: string;
}

export const CollectionNode = ({ data, parent }: CollectionNodeProps) => {
  return Object.entries(data).map(([key, value]) => {
    if (!Array.isArray(value)) {
      return <CollectionNode key={key} data={value} parent={key} />;
    }

    const title = (
      <>
        {parent ? <Badge>{parent}</Badge> : null}
        {key} ({value.length})
      </>
    );

    const id = parent
      ? `${parent}-${key}`.toLocaleLowerCase()
      : key.toLocaleLowerCase();

    return (
      <Accordion
        key={key}
        type="multiple"
        defaultValue={[key]}
        className="w-full"
      >
        <AccordionItem value={key}>
          <div className="sticky top-0 bg-background z-30">
            <AccordionTrigger id={id}>{title}</AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,325px))] gap-1">
              {value.map((release) => {
                const id = release.basic_information.id;

                return <Release release={release} key={id} />;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
};
