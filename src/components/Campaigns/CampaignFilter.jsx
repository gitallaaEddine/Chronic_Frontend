"use client";
import { useSearchParams, useNavigate } from "react-router-dom";

import { memo } from "react";

function CampaignFilter() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function updateParam(key, value) {
    const newParams = new URLSearchParams(params);
    //   if (params.get(key) === value) return;

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    navigate(`?${newParams.toString()}`, { replace: true });
  }
  return (
    <>
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <input
            name="search"
            // onChange={(e) => updateParam("search", e.target.value)}
            type="text"
            placeholder="Search by title"
            className="w-full px-4 py-2 pl-10 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-secondary/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex sm:justify-center flex-wrap gap-4 mb-8">
        <select
          name="category"
          onChange={(e) => updateParam("category", e.target.value)}
          className="px-4 py-2 border border-secondary/30 rounded-lg text-sm"
        >
          <option value={""}>All Campaigns </option>
          <option>Heart</option>
          <option>Kidney</option>
          <option>Cancer</option>
          <option>Other</option>
        </select>
        <select
          name="city"
          onChange={(e) => updateParam("city", e.target.value)}
          className="px-4 py-2 border border-secondary/30 rounded-lg text-sm"
        >
          <option value={""}>All cities</option>
          <option>Alger</option>
          <option>Adrar</option>
          <option>Blida</option>
          <option>Oran</option>
        </select>
        <select
          name="urgency"
          onChange={(e) => updateParam("urgency", e.target.value)}
          className="px-4 py-2 border border-secondary/30 rounded-lg text-sm"
        >
          <option>Any Urgency</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
        </select>
      </div>
    </>
  );
}

export default memo(CampaignFilter);
