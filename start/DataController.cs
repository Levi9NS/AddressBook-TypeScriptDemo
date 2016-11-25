using LiteApi;
using LiteApi.Attributes;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AddressBook
{
    public class DataController: LiteController
    {
        private static readonly object Sync = new object();
        private readonly string _jsonFile;

        public DataController(IHostingEnvironment env)
        {
            _jsonFile = Path.Combine(env.ContentRootPath, "data.json");
        }

        [HttpGet]
        public List<AddressBookItem> All()
        {
            List<AddressBookItem> items;
            lock (Sync)
            {
                items = ReadJsonFile();
            }
            return items;
        }

        [HttpPost]
        public AddressBookItem Save([FromBody] AddressBookItem item)
        {
            lock (Sync)
            {
                bool replace = true;
                if (item.Id == default(Guid))
                {
                    replace = false;
                    item.Id = Guid.NewGuid();
                }

                var items = ReadJsonFile();
                if (replace)
                {
                    var itemToUpdate = items.FirstOrDefault(x => x.Id == item.Id);
                    if (itemToUpdate != null)
                    {
                        itemToUpdate.Update(item);
                    }
                }
                else
                {
                    items.Add(item);
                }

                WriteJsonFile(items);
            }
            return item;
        }

        [HttpDelete, ActionRouteAttribute("/delete/{id}")]
        public bool Delete(Guid id)
        {
            lock (Sync)
            {
                var items = ReadJsonFile();
                WriteJsonFile(items.Where(x => x.Id != id));
            }
            return true;
        }

        private  List<AddressBookItem> ReadJsonFile()
        {
            string json = File.ReadAllText(_jsonFile);;
            return JsonConvert.DeserializeObject<List<AddressBookItem>>(json);
        }

        private void WriteJsonFile(IEnumerable<AddressBookItem> items)
        {
            string json = JsonConvert.SerializeObject(items);
            File.WriteAllText(_jsonFile, json);
        }
    }
}