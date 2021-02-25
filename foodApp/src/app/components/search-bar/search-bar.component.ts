import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchedcity = new FormControl();
  stateGroup: Array<any> = [
    {
      state: "Andaman and Nicobar Islands",
      cities: [
        "Port Blair*"
      ]
    },
    {
      state: "Andhra Pradesh",
      cities: [
        "Adoni",
        "Amalapuram",
        "Anakapalle",
        "Anantapur",
        "Bapatla",
        "Bheemunipatnam",
        "Bhimavaram",
        "Bobbili",
        "Chilakaluripet",
        "Chirala",
        "Chittoor",
        "Dharmavaram",
        "Eluru",
        "Gooty",
        "Gudivada",
        "Gudur",
        "Guntakal",
        "Guntur",
        "Hindupur",
        "Jaggaiahpet",
        "Jammalamadugu",
        "Kadapa",
        "Kadiri",
        "Kakinada",
        "Kandukur",
        "Kavali",
        "Kovvur",
        "Kurnool",
        "Macherla",
        "Machilipatnam",
        "Madanapalle",
        "Mandapeta",
        "Markapur",
        "Nagari",
        "Naidupet",
        "Nandyal",
        "Narasapuram",
        "Narasaraopet",
        "Narsipatnam",
        "Nellore",
        "Nidadavole",
        "Nuzvid",
        "Ongole",
        "Palacole",
        "Palasa Kasibugga",
        "Parvathipuram",
        "Pedana",
        "Peddapuram",
        "Pithapuram",
        "Ponnur",
        "Proddatur",
        "Punganur",
        "Puttur",
        "Rajahmundry",
        "Rajam",
        "Rajampet",
        "Ramachandrapuram",
        "Rayachoti",
        "Rayadurg",
        "Renigunta",
        "Repalle",
        "Salur",
        "Samalkot",
        "Sattenapalle",
        "Srikakulam",
        "Srikalahasti",
        "Srisailam Project (Right Flank Colony) Township",
        "Sullurpeta",
        "Tadepalligudem",
        "Tadpatri",
        "Tanuku",
        "Tenali",
        "Tirupati",
        "Tiruvuru",
        "Tuni",
        "Uravakonda",
        "Venkatagiri",
        "Vijayawada",
        "Vinukonda",
        "Visakhapatnam",
        "Vizianagaram",
        "Yemmiganur",
        "Yerraguntla"
      ]
    },
    {
      state: "Arunachal Pradesh",
      cities: [
        "Naharlagun",
        "Pasighat"
      ]
    },
    {
      state: "Assam",
      cities: [
        "Barpeta",
        "Bongaigaon City",
        "Dhubri",
        "Dibrugarh",
        "Diphu",
        "Goalpara",
        "Guwahati",
        "Jorhat",
        "Karimganj",
        "Lanka",
        "Lumding",
        "Mangaldoi",
        "Mankachar",
        "Margherita",
        "Mariani",
        "Marigaon",
        "Nagaon",
        "Nalbari",
        "North Lakhimpur",
        "Rangia",
        "Sibsagar",
        "Silapathar",
        "Silchar",
        "Tezpur",
        "Tinsukia"
      ]
    },
    {
      state: "Bihar",
      cities: [
        "Araria",
        "Arrah",
        "Arwal",
        "Asarganj",
        "Aurangabad",
        "Bagaha",
        "Barh",
        "Begusarai",
        "Bettiah",
        "Bhabua",
        "Bhagalpur",
        "Buxar",
        "Chhapra",
        "Darbhanga",
        "Dehri-on-Sone",
        "Dumraon",
        "Forbesganj",
        "Gaya",
        "Gopalganj",
        "Hajipur",
        "Jamalpur",
        "Jamui",
        "Jehanabad",
        "Katihar",
        "Kishanganj",
        "Lakhisarai",
        "Lalganj",
        "Madhepura",
        "Madhubani",
        "Maharajganj",
        "Mahnar Bazar",
        "Makhdumpur",
        "Maner",
        "Manihari",
        "Marhaura",
        "Masaurhi",
        "Mirganj",
        "Mokameh",
        "Motihari",
        "Motipur",
        "Munger",
        "Murliganj",
        "Muzaffarpur",
        "Narkatiaganj",
        "Naugachhia",
        "Nawada",
        "Nokha",
        "Patna*",
        "Piro",
        "Purnia",
        "Rafiganj",
        "Rajgir",
        "Ramnagar",
        "Raxaul Bazar",
        "Revelganj",
        "Rosera",
        "Saharsa",
        "Samastipur",
        "Sasaram",
        "Sheikhpura",
        "Sheohar",
        "Sherghati",
        "Silao",
        "Sitamarhi",
        "Siwan",
        "Sonepur",
        "Sugauli",
        "Sultanganj",
        "Supaul",
        "Warisaliganj"
      ]
    },
    {
      state: "Chandigarh",
      cities: [
        "Chandigarh*"
      ]
    },
    {
      state: "Chhattisgarh",
      cities: [
        "Ambikapur",
        "Bhatapara",
        "Bhilai Nagar",
        "Bilaspur",
        "Chirmiri",
        "Dalli-Rajhara",
        "Dhamtari",
        "Durg",
        "Jagdalpur",
        "Korba",
        "Mahasamund",
        "Manendragarh",
        "Mungeli",
        "Naila Janjgir",
        "Raigarh",
        "Raipur*",
        "Rajnandgaon",
        "Sakti",
        "Tilda Newra"
      ],
    },
    {
      state: "Dadra and Nagar Haveli",
      cities: [
        "Silvassa*"
      ]
    },
    {
      state: "Delhi",
      cities: [
        "Delhi",
        "New Delhi*"
      ]
    },
    {
      state: "Goa",
      cities: [
        "Mapusa",
        "Margao",
        "Marmagao",
        "Panaji*"
      ]
    },
    {
      state: "Gujarat",
      cities: [
        "Adalaj",
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Anjar",
        "Ankleshwar",
        "Bharuch",
        "Bhavnagar",
        "Bhuj",
        "Chhapra",
        "Deesa",
        "Dhoraji",
        "Godhra",
        "Jamnagar",
        "Kadi",
        "Kapadvanj",
        "Keshod",
        "Khambhat",
        "Lathi",
        "Limbdi",
        "Lunawada",
        "Mahesana",
        "Mahuva",
        "Manavadar",
        "Mandvi",
        "Mangrol",
        "Mansa",
        "Mahemdabad",
        "Modasa",
        "Morvi",
        "Nadiad",
        "Navsari",
        "Padra",
        "Palanpur",
        "Palitana",
        "Pardi",
        "Patan",
        "Petlad",
        "Porbandar",
        "Radhanpur",
        "Rajkot",
        "Rajpipla",
        "Rajula",
        "Ranavav",
        "Rapar",
        "Salaya",
        "Sanand",
        "Savarkundla",
        "Sidhpur",
        "Sihor",
        "Songadh",
        "Surat",
        "Talaja",
        "Thangadh",
        "Tharad",
        "Umbergaon",
        "Umreth",
        "Una",
        "Unjha",
        "Upleta",
        "Vadnagar",
        "Vadodara",
        "Valsad",
        "Vapi",
        "Vapi",
        "Veraval",
        "Vijapur",
        "Viramgam",
        "Visnagar",
        "Vyara",
        "Wadhwan",
        "Wankaner"
      ]
    },
    {
      state: "Haryana",
      cities: [
        "Bahadurgarh",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gohana",
        "Gurgaon",
        "Hansi",
        "Hisar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Ladwa",
        "Mahendragarh",
        "Mandi Dabwali",
        "Narnaul",
        "Narwana",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Pehowa",
        "Pinjore",
        "Rania",
        "Ratia",
        "Rewari",
        "Rohtak",
        "Safidon",
        "Samalkha",
        "Sarsod",
        "Shahbad",
        "Sirsa",
        "Sohna",
        "Sonipat",
        "Taraori",
        "Thanesar",
        "Tohana",
        "Yamunanagar"
      ],
    },
    {

      state: "Himachal Pradesh",
      cities: [
        "Mandi",
        "Nahan",
        "Palampur",
        "Shimla*",
        "Solan",
        "Sundarnagar"
      ],
    },
    {
      state: "Jammu and Kashmir",
      cities: [
        "Anantnag",
        "Baramula",
        "Jammu",
        "Kathua",
        "Punch",
        "Rajauri",
        "Sopore",
        "Srinagar*",
        "Udhampur"
      ],
    },
    {
      state: "Jharkhand",
      cities: [
        "Adityapur",
        "Bokaro Steel City",
        "Chaibasa",
        "Chatra",
        "Chirkunda",
        "Medininagar (Daltonganj)",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "Giridih",
        "Gumia",
        "Hazaribag",
        "Jamshedpur",
        "Jhumri Tilaiya",
        "Lohardaga",
        "Madhupur",
        "Mihijam",
        "Musabani",
        "Pakaur",
        "Patratu",
        "Phusro",
        "Ramgarh",
        "Ranchi*",
        "Sahibganj",
        "Saunda",
        "Simdega",
        "Tenu dam-cum-Kathhara"
      ],

    },
    {

      state: "Karnataka",
      cities: [
        "Adyar",
        "Afzalpur",
        "Arsikere",
        "Athni",
        "Bengaluru",
        "Belagavi",
        "Ballari",
        "Chikkamagaluru",
        "Davanagere",
        "Gokak",
        "Hubli-Dharwad",
        "Karwar",
        "Kolar",
        "Lakshmeshwar",
        "Lingsugur",
        "Maddur",
        "Madhugiri",
        "Madikeri",
        "Magadi",
        "Mahalingapura",
        "Malavalli",
        "Malur",
        "Mandya",
        "Mangaluru",
        "Manvi",
        "Mudalagi",
        "Mudabidri",
        "Muddebihal",
        "Mudhol",
        "Mulbagal",
        "Mundargi",
        "Nanjangud",
        "Nargund",
        "Navalgund",
        "Nelamangala",
        "Pavagada",
        "Piriyapatna",
        "Puttur",
        "Rabkavi Banhatti",
        "Raayachuru",
        "Ranebennuru",
        "Ramanagaram",
        "Ramdurg",
        "Ranibennur",
        "Robertson Pet",
        "Ron",
        "Sadalagi",
        "Sagara",
        "Sakaleshapura",
        "Sindagi",
        "Sanduru",
        "Sankeshwara",
        "Saundatti-Yellamma",
        "Savanur",
        "Sedam",
        "Shahabad",
        "Shahpur",
        "Shiggaon",
        "Shikaripur",
        "Shivamogga",
        "Surapura",
        "Shrirangapattana",
        "Sidlaghatta",
        "Sindhagi",
        "Sindhnur",
        "Sira",
        "Sirsi",
        "Siruguppa",
        "Srinivaspur",
        "Tarikere",
        "Tekkalakote",
        "Terdal",
        "Talikota",
        "Tiptur",
        "Tumkur",
        "Udupi",
        "Vijayapura",
        "Wadi",
        "Yadgir"
      ],
    },
    {
      state: "Karnatka",
      cities: [
        "Mysore"
      ],
    },
    {
      state: "Kerala",
      cities: [
        "Adoor",
        "Alappuzha",
        "Attingal",
        "Chalakudy",
        "Changanassery",
        "Cherthala",
        "Chittur-Thathamangalam",
        "Guruvayoor",
        "Kanhangad",
        "Kannur",
        "Kasaragod",
        "Kayamkulam",
        "Kochi",
        "Kodungallur",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Kunnamkulam",
        "Malappuram",
        "Mattannur",
        "Mavelikkara",
        "Mavoor",
        "Muvattupuzha",
        "Nedumangad",
        "Neyyattinkara",
        "Nilambur",
        "Ottappalam",
        "Palai",
        "Palakkad",
        "Panamattom",
        "Panniyannur",
        "Pappinisseri",
        "Paravoor",
        "Pathanamthitta",
        "Peringathur",
        "Perinthalmanna",
        "Perumbavoor",
        "Ponnani",
        "Punalur",
        "Puthuppally",
        "Koyilandy",
        "Shoranur",
        "Taliparamba",
        "Thiruvalla",
        "Thiruvananthapuram",
        "Thodupuzha",
        "Thrissur",
        "Tirur",
        "Vaikom",
        "Varkala",
        "Vatakara"
      ],
    },
    {

      state: "Madhya Pradesh",
      cities: [
        "Alirajpur",
        "Ashok Nagar",
        "Balaghat",
        "Bhopal",
        "Ganjbasoda",
        "Gwalior",
        "Indore",
        "Itarsi",
        "Jabalpur",
        "Lahar",
        "Maharajpur",
        "Mahidpur",
        "Maihar",
        "Malaj Khand",
        "Manasa",
        "Manawar",
        "Mandideep",
        "Mandla",
        "Mandsaur",
        "Mauganj",
        "Mhow Cantonment",
        "Mhowgaon",
        "Morena",
        "Multai",
        "Mundi",
        "Murwara (Katni)",
        "Nagda",
        "Nainpur",
        "Narsinghgarh",
        "Narsinghgarh",
        "Neemuch",
        "Nepanagar",
        "Niwari",
        "Nowgong",
        "Nowrozabad (Khodargama)",
        "Pachore",
        "Pali",
        "Panagar",
        "Pandhurna",
        "Panna",
        "Pasan",
        "Pipariya",
        "Pithampur",
        "Porsa",
        "Prithvipur",
        "Raghogarh-Vijaypur",
        "Rahatgarh",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rau",
        "Rehli",
        "Rewa",
        "Sabalgarh",
        "Sagar",
        "Sanawad",
        "Sarangpur",
        "Sarni",
        "Satna",
        "Sausar",
        "Sehore",
        "Sendhwa",
        "Seoni",
        "Seoni-Malwa",
        "Shahdol",
        "Shajapur",
        "Shamgarh",
        "Sheopur",
        "Shivpuri",
        "Shujalpur",
        "Sidhi",
        "Sihora",
        "Singrauli",
        "Sironj",
        "Sohagpur",
        "Tarana",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
        "Vijaypur",
        "Wara Seoni"
      ],
    }];

  stateGroupOptions!: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this.stateGroupOptions = this.searchedcity!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): Array<any> {
    if (value) {
      
      return this.stateGroup
        .map((group: any) => {
          console.log(group);
          
          return ({ state: group.state, cities: _filter(group.cities, value) });
        })
        .filter((group: any) => group.cities.length > 0);
    }

    return this.stateGroup;
  }

}
