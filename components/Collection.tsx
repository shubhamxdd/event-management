import { IEvent } from "@/lib/db/models/eventModel";
import Card from "./Card";
import Pagination from "./Pagination";

interface CollectionProps {
  data: IEvent[];
  emptyTitle: string;
  emptyDescription: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
}

const Collection = ({
  collectionType,
  data,
  emptyDescription,
  emptyTitle,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((item) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={item._id} className="flex justify-center">
                  <Card
                    event={item}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex justify-center items-center min-h-[200px] flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center ">
          <h2 className="font-bold text-[20px] md:text-[28px]">{emptyTitle}</h2>
          <p className="text-[14px]">{emptyDescription}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
