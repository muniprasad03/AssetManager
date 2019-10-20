using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Models.Reports;

namespace AssetManager.Services
{
    public static class Extensions
    {
        /// <summary>
        /// Maps a type to another using AutoMapper
        /// </summary>
        /// <typeparam name="T">Type to convert to.</typeparam>
        /// <param name="o">The object to convert.</param>
        /// <returns>Converted Type.</returns>
        public static T MapTo<T>(this object o)
        {
            if (o == null)
            {
                return default(T);
            }

            return Mapper.Map<T>(o);
        }

        /// <summary>
        /// Maps source data to destination object.
        /// </summary>
        /// <typeparam name="Ts">The type of the source.</typeparam>
        /// <typeparam name="Td">The type of the destination.</typeparam>
        /// <param name="o">The source.</param>
        /// <param name="destination">The destination.</param>
        /// <returns>Mapped data.</returns>
        public static Td MapTo<Ts, Td>(this Ts o, Td destination)
        {
            if (o == null)
            {
                return default(Td);
            }

            return Mapper.Map<Ts, Td>(o, destination);
        }

        /// <summary>
        /// Maps to.
        /// </summary>
        /// <param name="o">The o.</param>
        /// <param name="destinationType">Type of the destination.</param>
        /// <returns>Object of destination type.</returns>
        public static object MapToType(this object o, Type destinationType)
        {
            if (o == null)
            {
                return null;
            }

            return Mapper.Map(o, o.GetType(), destinationType);
        }

        /// <summary>
        /// Maps the collection to.
        /// </summary>
        /// <typeparam name="TSource">The type of the source.</typeparam>
        /// <typeparam name="TDestination">The type of the destination.</typeparam>
        /// <param name="o">The o.</param>
        /// <returns>Converted type.</returns>
        public static IList<TDestination> MapCollectionTo<TSource, TDestination>(this IList<TSource> o)
        {
            if (o == null)
            {
                return null;
            }

            return Mapper.Map<IList<TSource>, IList<TDestination>>(o);
        }

        /// <summary>
        /// Maps the collection to.
        /// </summary>
        /// <typeparam name="TSource">The type of the source.</typeparam>
        /// <typeparam name="TDestination">The type of the destination.</typeparam>
        /// <param name="o">The o.</param>
        /// <returns>Converted type</returns>
        public static IEnumerable<TDestination> MapCollectionTo<TSource, TDestination>(this IEnumerable<TSource> o)
        {
            if (o == null)
            {
                return null;
            }

            return Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(o);
        }


        /// <summary>
        /// Sets the audit fields on create.
        /// </summary>
        /// <typeparam name="T">object type</typeparam>
        /// <param name="modelObject">The model object.</param>
        /// <param name="context">The context.</param>
        public static void SetAuditFieldsOnCreate<T>(this Data.Model.XAssetDB.Record<T> modelObject, IRequestContext context) where T : new()
        {
            dynamic auditFieldOject = modelObject;
            auditFieldOject.CreatedBy = context.User.UserName;
            auditFieldOject.DateCreated = DateTime.UtcNow;
            auditFieldOject.ModifiedBy = context.User.UserName;
            auditFieldOject.DateModified = DateTime.UtcNow;
        }

        /// <summary>
        /// Sets the audit fields on update.
        /// </summary>
        /// <typeparam name="T">object type</typeparam>
        /// <param name="modelObject">The model object.</param>
        /// <param name="context">The context.</param>
        public static void SetAuditFieldsOnUpdate<T>(this Data.Model.XAssetDB.Record<T> modelObject, IRequestContext context) where T : new()
        {
            dynamic auditFieldOject = modelObject;
            auditFieldOject.ModifiedBy = context.User.UserName;
            auditFieldOject.DateModified = DateTime.UtcNow;
        }

        /// <summary>
        /// Extension method to do foreach on IEnumerable.
        /// </summary>
        /// <typeparam name="T">Enumerable list.</typeparam>
        /// <param name="source">The source.</param>
        /// <param name="action">The action.</param>
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            foreach (T item in source)
            {
                action(item);
            }
        }

        /// <summary>
        /// Distinct by functionality
        /// </summary>
        /// <typeparam name="TSource">The type of the source.</typeparam>
        /// <typeparam name="TKey">The type of the key.</typeparam>
        /// <param name="source">The source.</param>
        /// <param name="keySelector">The key selector.</param>
        /// <returns>returns distinct values based on the key</returns>
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }

        /// <summary>
        /// To the report data table.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">The source.</param>
        /// <param name="searchKey">The search key.</param>
        /// <returns></returns>
        public static DataTable ToReportDataTable(this IEnumerable<ReportCompareStats> source, CompareStatsRequest request, string searchKey = null)
        {
            var reportSource = source.GetSearchResults(searchKey).ToList();
            return reportSource.Any() ? reportSource.First().ToDataTable(reportSource, request) : new DataTable();
        }

        /// <summary>
        /// To the CSV.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns>comma separated quoted strings</returns>
        public static StringBuilder ToCSV(this IEnumerable<string> source)
        {
            var csv = new StringBuilder();
            foreach (var item in source)
            {
                csv.Append("'" + item + "'").Append(",");
            }

            return csv.Length == 0 ? csv : csv.Remove(csv.Length - 1, 1); // remove the last comma                 
        }

        /// <summary>
        /// To the CSV.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns>String Builder.</returns>
        public static StringBuilder ToFilterCSV(this IEnumerable<int> source)
        {
            source = source.Any() ? source : new List<int>() { 0 };
            var csv = new StringBuilder();
            foreach (var item in source)
            {
                csv.Append(item).Append(",");
            }

            return csv.Length == 0 ? csv : csv.Remove(csv.Length - 1, 1); // remove the last comma                 
        }


        /// <summary>
        /// To the report data table.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">The source.</param>
        /// <param name="searchKey">The search key.</param>
        /// <returns></returns>
        public static DataTable ToReportDataTable(this IEnumerable<StationSummaryStats> source, StationSummaryStatsRequest request, string searchKey = null)
        {
            var reportSource = source.GetSearchResults(searchKey).ToList();
            return reportSource.Any() ? reportSource.First().ToDataTable(reportSource, request) : new DataTable();
        }

        /// <summary>
        /// To the report data table.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">The source.</param>
        /// <param name="searchKey">The search key.</param>
        /// <returns></returns>
        public static DataTable ToReportDataTable<T>(this IEnumerable<T> source, string searchKey = null)
        {
            var reportSource = source.GetSearchResults(searchKey).Cast<IBaseReportView>().ToList();
            return reportSource.ToReportDataTable();
        }

        /// <summary>
        /// To the report data table.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns>the report data table.</returns>
        public static DataTable ToReportDataTable(this List<IBaseReportView> source)
        {
            ////var report = Activator.CreateInstance(source.FirstOrDefault().GetType()) as IBaseReportView;
            return source.Any() ? source.First().ToDataTable(source) : new DataTable();
        }
        /// <summary>
        /// Gets the search results.
        /// </summary>
        /// <typeparam name="T">the object type</typeparam>
        /// <param name="records">The records.</param>
        /// <param name="searchKey">The search key.</param>
        /// <returns>returns the search results</returns>
        public static IEnumerable<T> GetSearchResults<T>(this IEnumerable<T> records, string searchKey)
        {
            if (string.IsNullOrEmpty(searchKey) || !records.ToList().Any())
            {
                return records;
            }

            var properties = typeof(T).GetProperties().Where(prop => !Attribute.IsDefined(prop, typeof(IgnoreOnSearchAttribute))).ToList();
            return records.ToList().Where(record => properties.Any(property => property.GetValue(record) != null && property.GetValue(record).ToString().ToLower().Contains(searchKey.ToLower())));
        }
    }
}
