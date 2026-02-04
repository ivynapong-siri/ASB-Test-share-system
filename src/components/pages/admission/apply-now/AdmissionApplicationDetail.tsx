"use client";

import { AdmissionFormJson, serializeAdmissionForm } from "@/server/serializers/forms/admission-form-serializer";
import { useEffect, useState } from "react";

import StartToApply from "@/components/pages/admission/apply-now/StartToApply";
import { LOCAL_ADMISSION_STORAGE_KEY } from "@/server/constants/constants";
import { fetchCountries } from "@/server/fetches/countries";
import { Country } from "@/server/models/model-types";
import { JOTFORMDataPageJson } from "@/server/serializers/jotform-serializer";
import ApplicationFormDetail from "./application/ApplicationFormDetail";

interface AdmissionApplicationDetailProps {
  data: JOTFORMDataPageJson[][];
}

const AdmissionApplicationDetail = ({ data }: AdmissionApplicationDetailProps) => {
  const [showApplication, setShowApplication] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [admissionData, setAdmissionData] = useState<AdmissionFormJson | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    load();

    const storedData = localStorage.getItem(LOCAL_ADMISSION_STORAGE_KEY);
    if (storedData) {
      try {
        const parsedData = serializeAdmissionForm(JSON.parse(storedData));
        setAdmissionData(parsedData);
      } catch (error) {
        console.error("Error parsing admission data from localStorage:", error);
      }
    }
  }, []);

  return showApplication ? (
    <ApplicationFormDetail jotformData={data} admissionData={admissionData} countries={countries} />
  ) : (
    <StartToApply onStart={() => setShowApplication(true)} />
  );
};

export default AdmissionApplicationDetail;
