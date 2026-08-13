import { Table } from "@heroui/react";
import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const RecruiterJobs = async () => {
  const companyId = "comp_123";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recruiter / Company Jobs</h2>

      <Table aria-label="Recruiter Jobs Table">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>Company Name</Table.Column>
              <Table.Column>Job Title</Table.Column>
              <Table.Column>Employment Type</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-center">Actions</Table.Column>
            </Table.Header>
            <Table.Body emptyContent={"No jobs found."}>
              {jobs?.map((job) => (
                <Table.Row key={job.id || job._id}>
                  <Table.Cell>{job.companyId || job.companyName || "N/A"}</Table.Cell>
                  <Table.Cell>{job.title || job.jobTitle}</Table.Cell>
                  <Table.Cell>{job.type || job.employmentType}</Table.Cell>
                  <Table.Cell>{job.location || job.workMode}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        job.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </Table.Cell>

                  {/* Actions Column */}
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-3">
                      <span
                        title="View Details"
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <Eye size={18} />
                      </span>

                      <span
                        title="Edit Job"
                        className="p-1 text-gray-600 hover:text-yellow-600 transition-colors cursor-pointer"
                      >
                        <Edit size={18} />
                      </span>

                      <span
                        title="Delete Job"
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;