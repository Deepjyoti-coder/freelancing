'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, Trash2, ExternalLink, Loader2, ArrowRight, ShieldAlert } from 'lucide-react';
import { getProjects, deleteProject, Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this live project? This action is permanent.')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      alert('Project deleted successfully.');
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Live published Slugs</h1>
        <p className="text-sm text-slate-500">Track active customer surprise links running on the platform.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        {projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-4">
            <Globe size={32} className="mx-auto text-slate-350" />
            <p className="font-bold text-sm">No live surprise projects published yet.</p>
            <Link href="/admin">
              <Button variant="secondary" size="sm">Go to Orders & Provision one</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Project Title</th>
                  <th className="py-4 px-6">Template</th>
                  <th className="py-4 px-6">Relative Link</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-700">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-bold">{project.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">Created: {new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 capitalize">
                      <Badge variant="info">{project.template}</Badge>
                    </td>
                    <td className="py-4 px-6 text-xs text-blue-650 font-mono">
                      <div className="flex flex-col gap-1">
                        {project.published_url && project.published_url.startsWith('http') ? (
                          <a
                            href={project.published_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
                          >
                            {project.published_url.replace('https://', '')} <ExternalLink size={10} />
                          </a>
                        ) : null}
                        <a
                          href={`/s/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 text-slate-500"
                        >
                          /s/{project.slug} <ExternalLink size={10} />
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                        title="Delete Live Surprise Site"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
