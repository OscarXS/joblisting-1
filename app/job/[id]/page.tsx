import Button from "@/components/ui/Button";
import { formatPostedDate } from "@/utils/formatDate";
import Image from "next/image";

interface DynamicProps {
  params: {
    id: string;
  };
}

// ** THE CODE NEEDED TO LINK TO SLUG PAGES OR ID PAGES
const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://joblisting-1.vercel.app";

  return base_url;
};

const getData = async (id: string) => {
  const res = await fetch(checkEnvironment().concat(`/api/post/${id}`), // ** TIL HERE
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
const page = async ({ params }: DynamicProps) => {
  const { id } = params;
  const job = await getData(id);
  const formattedPostedDate = formatPostedDate(
    job.createdAt
  );
  return (
    <>
      <div className="bg-[url('/hero.png')] h-fit relative w-full bg-cover mt-[-70px] py-28">
        <div className="flex flex-col h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]">
          <h1 className="text-blue-600 font-bold text-4xl">
            {job.name}
          </h1>
        </div>
      </div>

      <div className="w-[90%] mx-auto max-w-[1450px] py-20">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
          <div className="lg:col-span-4 md:col-span-6">
            <div className="shadow rounded-md bg-white sticky top-20">
              <div className="p-6">
                <h5 className="text-lg font-semibold">
                  Job Information
                </h5>
                <div className="p-6 border-t border-slate-100 mt-5">
                  <ul>
                    <li>
                      <Image 
                        src={job.img}
                        width={100}
                        height={100}
                        style={{ height: 'auto', objectFit: 'contain' }}
                        alt={`${job.author} logo`}
                        className="mb-5"
                      />
                    </li>
                    <li>
                      <div>
                        <p>Employment Type:</p>
                        <span className="font-medium">
                          {job.employmentType}
                        </span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Company:</p>
                        <span className="font-medium">
                          {job.author}
                        </span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Location:</p>
                        <span className="font-medium">
                          {job.location}
                        </span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Salary:</p>
                        <span className="font-medium">
                          {job.salary}k/year
                        </span>
                      </div>
                    </li>
                    <li className="mt-4">
                      <div>
                        <p>Posted</p>
                        <span className="font-medium">
                          {formattedPostedDate}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 md:col-span-6">
            <h5 className="text-lg font-semibold">
              Job Description:
            </h5>
            <p className="mt-4 text-slate-400">
              {job.description}
            </p>

            <div className="mt-4">
              <Button>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;