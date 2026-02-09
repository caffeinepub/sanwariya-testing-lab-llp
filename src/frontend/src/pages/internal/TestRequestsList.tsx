import { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Loader2, FileText } from 'lucide-react';
import { useGetTestRequests, useDeleteTestRequest } from '@/hooks/useQueries';
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
import { Badge } from '@/components/ui/badge';
import LoginButton from '@/components/auth/LoginButton';
import { downloadTestRequestPdf } from '@/utils/testRequestPdf';
import { toast } from 'sonner';
import type { TestRequest } from '@/backend';

export default function TestRequestsList() {
  const [limit] = useState(50);
  const [offset] = useState(0);
  const { data: requests, isLoading } = useGetTestRequests(limit, offset);
  const deleteMutation = useDeleteTestRequest();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this test request?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleDownloadPdf = async (request: TestRequest) => {
    try {
      setDownloadingId(request.id);
      downloadTestRequestPdf(request);
      toast.success('Report opened in new window. Use Print to save as PDF.');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate report. Please try again.'
      );
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="container py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Requests</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and review submitted testing requests
          </p>
        </div>
        <LoginButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Test Requests</CardTitle>
          <CardDescription>
            {requests?.length || 0} request(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Standards</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.customerName}</TableCell>
                      <TableCell>{request.company || '—'}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{request.phone}</div>
                          {request.email && (
                            <div className="text-muted-foreground">{request.email}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.testItemType}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {request.standards || '—'}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(Number(request.submittedAt) / 1_000_000),
                          'MMM d, yyyy'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadPdf(request)}
                            disabled={downloadingId === request.id}
                            title="Download PDF Report"
                          >
                            {downloadingId === request.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <FileText className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(request.id)}
                            disabled={deleteMutation.isPending}
                            title="Delete request"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No test requests found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
