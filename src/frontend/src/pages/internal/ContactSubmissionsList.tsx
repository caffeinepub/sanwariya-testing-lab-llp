import { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Loader2 } from 'lucide-react';
import { useGetContactSubmissions, useDeleteContactSubmission } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LoginButton from '@/components/auth/LoginButton';

export default function ContactSubmissionsList() {
  const [limit] = useState(50);
  const [offset] = useState(0);
  const { data: submissions, isLoading } = useGetContactSubmissions(limit, offset);
  const deleteMutation = useDeleteContactSubmission();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="container py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and review contact form submissions
          </p>
        </div>
        <LoginButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions</CardTitle>
          <CardDescription>
            {submissions?.length || 0} submission(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : submissions && submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{submission.phone}</div>
                          {submission.email && (
                            <div className="text-muted-foreground">{submission.email}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="line-clamp-2 text-sm">{submission.message}</p>
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(Number(submission.submittedAt) / 1_000_000),
                          'MMM d, yyyy'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(submission.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No contact submissions found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
