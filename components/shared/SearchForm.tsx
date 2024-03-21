"use client"

import useJobStore from '@/store/useJobStore'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { jobType } from "@/types/jobTypes"
import { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'

interface SearchFormProps {
  jobs: jobType[]
}
const initialState = {
  title: "",
  location: "",
  author: "",
}

const SearchForm = ({ jobs }: SearchFormProps) => {
  const [state, setState] = useState(initialState)
  const [value, setValue] = useState("")
  const {setFilteredJobs} = useJobStore()

  useEffect(() => {
    function filterAndSetJobs() {
      const filteredJobs = jobs.filter((item) => {
        const titleCondition =
          state.title === "" ||
          item.name
            .toLowerCase()
            .includes(state.title.toLowerCase());
        const locationCondition =
          state.location === "" ||
          item.location
            .toLowerCase()
            .includes(state.location.toLowerCase());
        const companyCondition =
          state.author === "" ||
          item.author
            .toLowerCase()
            .includes(state.author.toLowerCase());
        return (
          titleCondition &&
          locationCondition &&
          companyCondition
        );
      });

      setFilteredJobs(filteredJobs);
    }

    filterAndSetJobs();
  }, [jobs, state, setFilteredJobs]);
  
  function onChange(event:ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <div className="bg-gray-50/50 shadow rounded-md p-5 w-full">
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-3">
              <Input 
                id='title'
                noLabel
                type='text'
                placeholder='Job Title'
                onChange={onChange}
              />
            </div>
            <div className="col-span-12 lg:col-span-3 flex gap-1">
              /
              <Input 
                  id='location'
                  noLabel
                  type='text'
                  placeholder='Location'
                  onChange={onChange}
                />
            </div>
            <div className="col-span-12 lg:col-span-3 flex gap-1">
              /
              <Input 
                  id='author'
                  noLabel
                  type='text'
                  placeholder='Company'
                  onChange={onChange}
                />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Link href={`#jobs`}>
                <Button type='submit' fullWidth>Search Jobs</Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SearchForm